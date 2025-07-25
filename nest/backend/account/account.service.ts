import {Injectable} from '@nestjs/common';
import {User} from './entities/user.entity';
import BlockchainService from "../blockchain/blockchain.service";
import {TransactionRepository} from "./repositories/transaction.repository";
import {WalletRepository} from "../xpubgenerator/repositories/wallet.repository";
import {CoinName} from "../xpubgenerator/enums/coin";
import {TokenStandard} from 'src/xpubgenerator/enums/token';
import {AddressType} from "../xpubgenerator/enums/address";
import ScanObserver from "../blockchain/observers/scan-observer";
import {ExistingWalletDto} from "../xpubgenerator/dto/wallet.dto";
import {Account} from "./entities/account.entity";
import ISubscriberOptions from "../blockchain/subscribers/subscriber-options";
import BlockchainSubscriber from "../blockchain/subscribers/blockchain-subscriber";
import {Address} from "../xpubgenerator/entities/address.entity";
import Launcher from "../blockchain/observers/launcher";

@Injectable()
export class AccountService {

    public constructor(
        private blockchainService: BlockchainService,
        private transactionRepository: TransactionRepository,
        private walletRepository: WalletRepository,
    ) {
    }

    //TODO: THIS IS BULL SHIT!!!
    public getWalletTransactions(account: Account, user: User) {
        const addresses = user.addresses.filter(addr => addr.type == AddressType.STATIC);
        const result = [];

        addresses.forEach(addr => {
            account.transactions.forEach(tx => {
                if (addr.val == tx.addressTo) {
                    result.push(tx);
                }
            })
        })

        return result;
    }

    //TODO: THIS IS BULL SHIT!!!
    public async getWallets(user: User) {
        const wallets = await this.walletRepository.getUserWallets(user.id);

        const result: ExistingWalletDto[] = [];

        wallets.forEach(wallet => {
            result.push({
                id: String(wallet.id),
                coin: wallet.address.xpub.coin.name,
                address: wallet.address.val,
                amount: wallet.address.balance
            })

            wallet.address.tokenWallets.forEach(tokenWallet => {
                result.push({
                    id: wallet.id + '-' + tokenWallet.token.name + '-' + tokenWallet.token.standard,
                    coin: tokenWallet.token.name,
                    address: tokenWallet.address.val,
                    amount: tokenWallet.balance,
                    standard: tokenWallet.token.standard
                })
            })
        })

        return result;
    }

    public getAddressTransactions(account: Account, user: User) {
        const addresses = user.addresses.filter(addr => addr.type == AddressType.DYNAMIC);
        const result = [];

        addresses.forEach(addr => {
            account.transactions.forEach(tx => {
                if (addr.val == tx.addressTo) {
                    result.push(tx);
                }
            })
        })

        return result;
    }

    public async getAddressTransactionsInfo(account: Account, user: User) {
        const transactions = this.getAddressTransactions(account, user);
        const wallets = await this.getWallets(user)

        const transactionsInfo = wallets.map(w => {
            return {
                id: w.id,
                coin: w.coin,
                amount: 0,
                standard: w.standard
            }
        })

        transactions.forEach(tx => {
            transactionsInfo.forEach(info => {
                if (
                    tx.currency == info.coin
                    && ((tx.tokenStandard == info.standard) || (!tx.tokenStandard && !info.standard))
                ) {
                    info.amount += tx.amount;
                }
            })
        })

        return transactionsInfo;
    }

    /**
     * NOTE: Very bad approach!!! need to find another way
     * @param user
     * @param interval interval in milliseconds between api call requests of address transactions
     *
     */
    public async updateUserWalletTransactions(user: User, interval: number = 1000) {
        await this.transactionRepository.manager.transaction(async (manager) => {

            for (const address of user.addresses) {
                let txData = await this.blockchainService.scanTransactions(address);
                await this.sleep(interval)

                let txs: any;

                const coin = address.xpub.coin.name;
                switch (coin) {
                    case CoinName.BTC:
                        txs = txData.txs.filter(tx => tx.balance > 0);
                        break;

                    case CoinName.TRX:
                    case CoinName.ETH:
                        txs = txData.filter(tx => tx.to == address.val);
                        break;
                }


                if (txs.length) {
                    for (const tx of txs) {
                        const txdto = ScanObserver.getApiCallTransactionDto(tx, coin);

                        const foundTx = await this.transactionRepository.findByHash(txdto.hash);
                        if (!foundTx) {
                            const transaction = this.transactionRepository
                                .createTransaction(txdto);

                            transaction.account = user.account;
                            transaction.currency = coin;
                            await manager.save(transaction);

                            address.balance = address.balance + txdto.amount;
                            await manager.save(address);
                        }
                    }
                }

                if (address.tokenWallets?.length) {
                    for (const tw of address.tokenWallets) {
                        // transactions from blockchain scan
                        txData = await this.blockchainService.scanTransactions(address, tw.token.standard);
                        await this.sleep(interval)

                        txs = txData.filter(tx => tx.to == tw.address.val);

                        for (const tx of txs) {
                            const txdto = ScanObserver.getApiCallTransactionDto(tx, coin, tw.token.standard);

                            const foundTx = await this.transactionRepository.findByHash(txdto.hash);
                            if (!foundTx) {
                                const transaction = this.transactionRepository
                                    .createTransaction(txdto);

                                transaction.account = user.account;
                                transaction.currency = tw.token.name;
                                transaction.tokenStandard = tw.token.standard;
                                await manager.save(transaction);

                                tw.balance = tw.balance + txdto.amount;
                                await manager.save(tw);
                            }
                        }
                    }
                }
            }
        })
    }

    public includeAddressInBlockchainObserver(address: Address, options: ISubscriberOptions) {
        switch (address.xpub.coin.name) {
            case CoinName.ETH: {
                const subscriber = new BlockchainSubscriber(address, options);
                Launcher.eth.includeSubscriber(subscriber);

                if (options.usdt) {
                    if (options.usdt.includes(TokenStandard.ERC20)) {
                        Launcher.erc20.includeSubscriber(subscriber);
                    }

                    if (options.usdt.includes(TokenStandard.BEP20)) {
                        Launcher.bep20.includeSubscriber(subscriber);
                    }
                }
            }
            break;

            case CoinName.TRX: {
                const subscriber = new BlockchainSubscriber(address, options);
                Launcher.trx.includeSubscriber(subscriber);

                if (options.usdt) {
                    if (options.usdt.includes(TokenStandard.TRC20)) {
                        Launcher.trc20.includeSubscriber(subscriber);
                    }
                }
            }
            break;

            case CoinName.BTC:
                Launcher.btc.includeSubscriber(new BlockchainSubscriber(address, options));
                break;
        }
    }

    private async sleep(milliseconds: number) {
        await new Promise((res) => setTimeout(res, milliseconds));
    }
}
