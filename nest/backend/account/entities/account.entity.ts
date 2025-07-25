import {Column, Entity, Generated, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.entity";
import {Address} from "../../xpubgenerator/entities/address.entity";
import {Transaction} from "./transaction.entity";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', unique: true, nullable: false})
    name: string

    @OneToMany(() => User, (user) => user.account, {cascade: true})
    @JoinColumn()
    users: User[]

    @Column({type: 'decimal', precision: 3, scale: 2, default: 0})
    mdr: number

    @Column({type: 'varchar', unique: true, nullable: true})
    callbackUrl: string

    @OneToMany(() => Transaction, (transaction) => transaction.account, {cascade: true})
    @JoinColumn()
    transactions: Transaction[]
}