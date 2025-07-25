import {Column, CreateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import {Currency} from "../../xpubgenerator/types";
import {TransactionStatus} from "../enums/transaction";
import {Account} from "../entities/account.entity";

export default interface AccountTransactionDto {

    amount: number;

    currency: Currency;

    created: Date;

    addressTo: string;

    addressFrom: string;

    txid: string;

    status: TransactionStatus;

    description?: string;

    blockchainFee?: number;

    fee?: number;

    account: Account
}