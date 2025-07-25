import {TokenName, TokenStandard} from "../../xpubgenerator/enums/token";
import {BlockchainTransactionDto} from "./blockchain-transaction.dto";
import {TransactionStatus} from "../enums/transaction";
import {CoinName} from "../../xpubgenerator/enums/coin";
import {Currency} from "../../xpubgenerator/types";

export interface ApiCallTransactionDto extends BlockchainTransactionDto {

}

export class ApiCallTronTransactionDto implements ApiCallTransactionDto {
    timestamp: number;
    hash: string;
    from: string;
    to: string;
    amount: number;
    status?: TransactionStatus;
    fee?: number;

    token?: TokenStandard;

    public constructor(data: any, token?: TokenStandard) {
        this.timestamp = data.block_timestamp;
        this.hash = data.hash;
        this.from = data.from;
        this.to = data.to;
        this.amount = data.amount / 1e6;
        this.status = TransactionStatus.SUCCESS; //data.contract_ret == 'SUCCESS'

        this.token = token;
    }
}

export class ApiCallEtherTransactionDto implements ApiCallTransactionDto {
    timestamp: number;
    hash: string;
    from: string;
    to: string;
    amount: number;
    status?: TransactionStatus;
    fee?: number

    token?: TokenStandard;

    public constructor(data: any, token?: TokenStandard) {
        let decimals = 1e18;
        switch (token) {
            case TokenStandard.TRC20:
            case TokenStandard.ERC20:
                decimals = 1e6;
                break;
        }

        this.timestamp = data.timeStamp * 1000;
        this.hash = data.hash;
        this.from = data.from;
        this.to = data.to;
        this.amount = data.value / decimals;
        this.fee = data.gas * data.gasPrice / 1e18;

        this.token = token;
    }
}

export class ApiCallBitcoinTransactionDto implements ApiCallTransactionDto {
    timestamp: number;
    hash: string;
    from: string;
    to: string;
    amount: number;
    status?: TransactionStatus;
    fee?: number;

    public constructor(data: any) {
        this.timestamp = data.time * 1000;
        this.hash = data.hash;
        this.amount = data.out[0].value / 1e8;
        this.fee = data.fee / 1e8;
        this.from = data.inputs[0].prev_out.addr;
        this.to = data.out[0].addr;

    }
}