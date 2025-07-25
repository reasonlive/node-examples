import {DataSource, Repository} from "typeorm";
import {User} from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import {Account} from "../entities/account.entity";

@Injectable()
export class AccountRepository extends Repository<Account> {
    constructor(private dataSource: DataSource) {
        super(Account, dataSource.createEntityManager());
    }

    /**
     * Get one User with all his relations recursively
     * @param id
     */
    public async get(id: number){
        return await this.dataSource.getRepository(Account).createQueryBuilder('acc')
            .leftJoinAndSelect('acc.users', 'u')
            .leftJoinAndSelect('acc.transactions', 'txs')
            .where('acc.id = :id', {id})
            .getOne();
    }

    public async findAll() {
        return await this.dataSource.getRepository(Account).createQueryBuilder('acc')
            .leftJoinAndSelect('acc.users', 'u')
            //.leftJoinAndSelect('acc.addresses', 'addrs')
            .getMany();
    }
}