import {
    Column,
    Entity,
    Generated,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {UserRole} from "../enums/user-role";
import {Wallet} from "../../xpubgenerator/entities/wallet.entity";
import { Account } from "./account.entity";
import { TokenWallet } from "../../xpubgenerator/entities/token.wallet.entity";
import { Address } from "../../xpubgenerator/entities/address.entity";

@Entity()
@Index(['email', 'apiKey'], {unique: true})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Index('idx_mail')
    @Column({unique: true, nullable: false})
    email: string

    @Column({nullable: false})
    password: string

    @Index('idx_uuid')
    @Column({type: "uuid"})
    apiKey: string

    @Column({type: "set", enum: UserRole, default: UserRole.USER})
    roles: UserRole[]

    @OneToMany(() => Address, (address) => address.user, {cascade: true})
    @JoinColumn()
    addresses: Address[]

    @ManyToOne(() => Account, (account) => account.users)
    @JoinColumn()
    account: Account
}