import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {UserRepository} from './repositories/user.repository';
import {XpubgeneratorService} from "../xpubgenerator/xpubgenerator.service";
import BlockchainService from "../blockchain/blockchain.service";
import {TokenStandard} from "../xpubgenerator/enums/token";
import {AddressRepository} from "../xpubgenerator/repositories/address.repository";
import ScanObserver from "../blockchain/observers/scan-observer";
import {APICallReason} from "../blockchain/enums/api-calls";
import * as uuid from 'uuid';
import {TransactionRepository} from "./repositories/transaction.repository";
import {CoinName} from 'src/xpubgenerator/enums/coin';
import {ApiCallTransactionDto} from "./dto/api-call-transaction.dto";
import EthereumBlockchainObserver from "../blockchain/observers/ethereum-blockhain-observer";
import BlockchainSubscriber from "../blockchain/subscribers/blockchain-subscriber";
import TronBlockchainObserver from "../blockchain/observers/tron-blockhain-observer";
import ISubscriberOptions from "../blockchain/subscribers/subscriber-options";
import {UserRole} from "./enums/user-role";
import {User} from "./entities/user.entity";
import {AddressType} from "../xpubgenerator/enums/address";
import {Address} from "../xpubgenerator/entities/address.entity";
import Erc20TokenObserver from "../blockchain/observers/token/erc20-token-observer";
import Trc20TokenObserver from "../blockchain/observers/token/trc20-token-observer";
import BitcoinBlockchainObserver from "../blockchain/observers/bitcoin-blockhain-observer";
import Bep20TokenObserver from "../blockchain/observers/token/bep20-token-observer";
import Logger from "../logger";
import {AccountService} from "./account.service";

@Controller('api/payment') // TODO: make base api payment controller of make guards for merchant
export class PaymentController {

    public constructor(
        private readonly userRepository: UserRepository,
        private readonly xpubgen: XpubgeneratorService,
        private readonly blockchainService: BlockchainService,
        private readonly addressRepository: AddressRepository,
        private readonly transactionRepository: TransactionRepository,
        private readonly accountService: AccountService,
        private readonly logger: Logger
    ) {
    }

    @Post('/address/get')
    public async requireAddress(@Body() body, @Res() res) {
        const checkResult = await this.checkMerchantAccessRights(body, res);

        if (!(checkResult instanceof User)) {
            return checkResult;
        }

        const user = checkResult;
        const address = user.addresses.find(address => address.xpub.coin.name == body.coin?.toUpperCase());
        if (!address) {
            return res.status(HttpStatus.BAD_REQUEST).json({error: `Bad request: coin ${body.coin} is not maintained`});
        }

        try {
            const dynamicAddress = await this.xpubgen.generateDynamicAddress(address.wallet);

            return res.status(HttpStatus.OK).json({
                address: dynamicAddress.val,
                coin: dynamicAddress.xpub.coin.name,
                expiredAt: dynamicAddress.expiredAt,
                apiKey: user.apiKey
            })
        }
        catch (err) {
            await this.logger.error(err.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: 'Internal server error, please contact us'});
        }
    }

    @Post('/address/balance/get')
    public async requireAddressBalance(@Body() body, @Res() res) {
        let checkResult = await this.checkMerchantAccessRights(body, res);
        if (!(checkResult instanceof User)) {
            return checkResult;
        }
        const user = checkResult;


        checkResult = await this.checkAddressUsingRights(body.address, user, res);
        if (!(checkResult instanceof Address)) {
            return checkResult;
        }
        const address = checkResult;


        let standard = body.usdt?.toUpperCase();
        standard = standard ? TokenStandard[standard] : null;

        const balance = await this.blockchainService.scanBalance(address, standard);

        return res.status(HttpStatus.OK).json({
           address: address.val,
           coin: address.xpub.coin.name,
           usdt: standard,
           balance,
           apiKey: user.apiKey
        });
    }

    @Post('/address/transactions/check')
    public async requireAddressTransactions(@Body() body, @Res() res) {
        let checkResult = await this.checkMerchantAccessRights(body, res);
        if (!(checkResult instanceof User)) {
            return checkResult;
        }
        const user = checkResult;


        checkResult = await this.checkAddressUsingRights(body.address, user, res);
        if (!(checkResult instanceof Address)) {
            return checkResult;
        }
        const address = checkResult;

        let standard = body.usdt?.toUpperCase();
        standard = standard ? TokenStandard[standard] : null;

        let transactions = await this.blockchainService.scanTransactions(address, standard);
        const coin = address.xpub.coin.name;

        if (coin == CoinName.BTC) {
            transactions = transactions?.txs ?? [];
        }

        let txs: ApiCallTransactionDto[] = [];
        for (let tx of transactions) {
            const txdto = ScanObserver.getApiCallTransactionDto(tx, coin, standard);
            const found = await this.transactionRepository.findByHash(txdto.hash);
            if (!found) {
                await this.transactionRepository.createInSqlTransaction(txdto, address);
                txs.push(txdto);
            }
        }

        return res.status(HttpStatus.OK).json({
            address: address.val,
            coin,
            usdt: standard,
            newTransactions: txs,
            apiKey: user.apiKey
        });
    }

    @Post('/address/transactions/observe') // todo: make logger for response data
    public async  listenAddressEvents(@Body() body, @Res() res) {
        let checkResult = await this.checkMerchantAccessRights(body, res);
        if (!(checkResult instanceof User)) {
            return checkResult;
        }
        const user = checkResult;


        checkResult = await this.checkAddressUsingRights(body.address, user, res);
        if (!(checkResult instanceof Address)) {
            return checkResult;
        }
        const address = checkResult;


        if (address.isObservable) {
            return res.status(HttpStatus.BAD_REQUEST).json({error: `Address ${body.address} is already observed`});
        }
        else {
            address.isObservable = true;
            await this.addressRepository.save(address);
        }

        const options: ISubscriberOptions = {
            callbackUrl: body.callbackUrl ?? user.account.callbackUrl,
            usdt: address.tokenWallets.length ? address.tokenWallets.map(tw => tw.token.standard) : null,
            reason: APICallReason.TRANSACTIONS,
            repository: this.transactionRepository
        };

        this.accountService.includeAddressInBlockchainObserver(address, options);

        return res.status(HttpStatus.OK).json({
            message: `Address ${body.address} is observing now until ${address.expiredAt}`,
            callback: body.callbackUrl,
            address: body.address,
            coin: address.xpub.coin.name,
            usdt: body.usdt,
            apiKey: user.apiKey,
        });
    }

    @Post('/processing/test')
    public async apiTest(@Body() body, @Res() res) {
        console.log(body);
        console.log('the end')
        return res.status(HttpStatus.OK);
    }

    /**
     * TODO: move to guards
     * @param body
     * @param res
     * @private
     */
    private async checkMerchantAccessRights(body: any, res: any) {
        if (!body.apiKey) {
            return res.status(HttpStatus.BAD_REQUEST).json({error: 'Bad request: Not all params is provided'});
        }

        if (!uuid.validate(body.apiKey)) {
            return res.status(HttpStatus.BAD_REQUEST).json({error: 'Bad request: Incorrect api key'});
        }

        const user = await this.userRepository.findByApiKey(body.apiKey);
        if (!user) {
            return res.status(HttpStatus.FORBIDDEN).json({error: 'Access is forbidden'});
        }

        if (!user.roles.includes(UserRole.MERCHANT)) {
            return res.status(HttpStatus.FORBIDDEN).json({error: 'Access is forbidden'});
        }

        return user;
    }

    /**
     * TODO: move to guards
     * @param addr
     * @param user
     * @param res
     * @private
     */
    private async checkAddressUsingRights(addr: string, user: User, res: any) {
        const address = await this.addressRepository.get(addr);
        if (!address) {
            return res.status(HttpStatus.NOT_FOUND).json({error: 'Address not found'});
        }

        if (address.user.id !== user.id) {
            return res.status(HttpStatus.FORBIDDEN).json({error: `Bad request: Incorrect address`});
        }

        if (address.type == AddressType.STATIC) {
            return res.status(HttpStatus.BAD_REQUEST).json({error: `Wallet addresses is not observable`});
        }

        return address;
    }
}