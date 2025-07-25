import {Entity, Column, CreateDateColumn, JoinColumn, PrimaryGeneratedColumn, ManyToOne, Index} from 'typeorm';
import { Currency } from 'src/xpubgenerator/types';
import { TransactionDirection, TransactionStatus } from "../enums/transaction";
import {Address} from "../../xpubgenerator/entities/address.entity";
import { Account } from './account.entity';
import {BlockchainNetworkType} from "../../blockchain/enums/blockchain";
import {Coin} from "../../xpubgenerator/entities/coin.entity";
import {Token} from "../../xpubgenerator/entities/token.entity";
import {TokenName, TokenStandard} from "../../xpubgenerator/enums/token";
import {CoinName} from "../../xpubgenerator/enums/coin";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'double', default: 0 })
  amount: number

  @Column()
  currency: Currency

  @Column({nullable: true})
  tokenStandard: TokenStandard

  @CreateDateColumn()
  created: Date

  @Index('idx_addr_to')
  @Column({nullable: true})
  addressTo?: string

  @Index('idx_addr_from')
  @Column({nullable: true})
  addressFrom?: string

  @Index('idx_txid_hash')
  @Column({ nullable: false })
  txid: string

  @Column({ default: TransactionStatus.PENDING })
  status: TransactionStatus

  @Column({ type: 'double', nullable: true })
  blockchainFee?: number

  @Column({ type: 'double', nullable: true })
  fee?: number

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn()
  account?: Account

  @Column({ default: BlockchainNetworkType.MAINNET, nullable: true })
  networkType: BlockchainNetworkType

  @Column({ default: TransactionDirection.INCOMING, nullable: false })
  direction: TransactionDirection

  @Column({ nullable: true })
  description?: string
}
