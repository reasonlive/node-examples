import {TokenName, TokenStandard} from "../../xpubgenerator/enums/token";
import {BIPHelper} from "../../xpubgenerator/bips/bip-helper";
import {TransactionStatus} from "../enums/transaction";
import {Currency} from "../../xpubgenerator/types";
import {CoinName} from "../../xpubgenerator/enums/coin";

export interface BlockchainTransactionDto {
    timestamp: number;
    hash: string;
    from?: string;
    to: string;
    amount: number;
    status?: TransactionStatus;
    fee?: number;
    token?: TokenStandard|null;
}

export class TronBlockchainTransactionDto implements BlockchainTransactionDto {
    timestamp: number;
    hash: string;
    from: string;
    to: string;
    amount: number;
    status?: TransactionStatus;
    fee?: number;

    public constructor(data: any) {
        const helper = new BIPHelper()

        this.timestamp = data.timestamp;
        this.hash = data.hash;
        this.from = helper.tronHexAddressToBase58(data.from);
        this.to = helper.tronHexAddressToBase58(data.to);
        this.amount = data.amount / 1e6;
        this.status = data.status ?? TransactionStatus.SUCCESS;
        this.fee = data.fee;
    }
}

export class EthereumBlockchainTransactionDto implements BlockchainTransactionDto {
    timestamp: number;
    hash: string;
    from: string;
    to: string;
    amount: number;
    status?: TransactionStatus;
    fee?: number;
    currency: string;

    public constructor(data: any) {
        this.timestamp = data.timestamp ?? Date.now();
        this.from = data.from?.toLowerCase();
        this.to = data.to?.toLowerCase();
        this.hash = data.hash;
        this.amount = Number(data.value) / 1e18;
        this.status = data.status ?? TransactionStatus.SUCCESS;
        this.fee = Number(data.gas) * Number(data.gasPrice) / 1e18;
        this.currency = CoinName.ETH;
    }

    /*accessList: [],
    blockHash: '0xb6e0722b5d602f159a3be25896fd311f11a0905931f88c499421f641690913b1',
    blockNumber: 18550651n,
    chainId: 1n,
    from: '0x68841a1806ff291314946eebd0cda8b348e73d6d',
    gas: 420000n,
    gasPrice: 30051686255n,
    hash: '0xc0c3507723ad4006ab5ad3fe1c7a29759bf10e77ef116d3ed79d59e045dcd0b0',
    input: '0xa9059cbb000000000000000000000000cc61bde1b29115eaa70c5730d32cc78f5c45e96f000000000000000000000000000000000000000000000000000000000578f000',
    maxFeePerGas: 400000000000n,
    maxPriorityFeePerGas: 100000000n,
    nonce: 94762n,
    r: '0x6b19e0c2e5bd85378495216414a7bf6f8ae17a7ac9aa7d68a8a75f05294a5498',
    s: '0x73bacf0a14229ba963e7a678be7cd906e6461de3476d3665ae4936c78a4bef03',
    to: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    transactionIndex: 91n,
    type: 2n,
    v: 0n,
    value: 0n,
    data: '0xa9059cbb000000000000000000000000cc61bde1b29115eaa70c5730d32cc78f5c45e96f000000000000000000000000000000000000000000000000000000000578f000'
*/
}

export class BitcoinBlockchainTransactionDto implements BlockchainTransactionDto {
    timestamp: number;
    hash: string;
    from?: string;
    to: string;
    amount: number;
    status?: TransactionStatus;
    fee?: number;
    block?: number;
    currency: string;

    public constructor(data: any, blockHeight: number = null) {
        this.timestamp = data.time * 1000;
        this.hash = data.txid;
        //this.from // todo: find out how to get from addr
        this.to = data.vout[0].scriptPubKey.address;
        this.amount = data.vout[0].value;
        this.fee = data.fee;
        this.status = TransactionStatus.SUCCESS;
        this.currency = CoinName.BTC;
        this.block = blockHeight;
    }
}

export class TokenBlockchainTransactionDto implements BlockchainTransactionDto {
    timestamp: number;
    hash: string;
    from: string;
    to: string;
    amount: number;
    status?: TransactionStatus;
    fee?: number;
    block?: number;

    token: TokenStandard;

    public constructor(data: any, token: TokenStandard) {
        let decimals: number = 1e18;
        let from = data.from;
        let to = data.to;

        switch (token) {
            case TokenStandard.TRC20:
                const addressHelper = new BIPHelper();
                from = addressHelper.tronHexAddressToBase58(data.from);
                to = addressHelper.tronHexAddressToBase58(data.to);
                decimals = 1e6;
                break;

            case TokenStandard.ERC20:
                from = data.from.toLowerCase();
                to = data.to.toLowerCase();
                decimals = 1e6;
                break;
        }

        this.timestamp = data.timestamp ?? Date.now();
        this.from = from;
        this.to = to;
        this.hash = data.hash;
        this.amount = Number(data.value) / decimals;
        this.status = data.status ?? TransactionStatus.SUCCESS;

        this.token = token;
    }
}