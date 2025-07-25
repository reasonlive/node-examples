import {DataSource, Repository} from "typeorm";
import {User} from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import {Wallet} from "../../xpubgenerator/entities/wallet.entity";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    /**
     * Get one User with all his relations recursively
     * @param id
     */
    public async get(id: number){
        return await this.dataSource.getRepository(User).createQueryBuilder('u')
            .leftJoinAndSelect('u.account', 'ua')

            .leftJoinAndSelect('u.addresses', 'addr')
            .leftJoinAndSelect('addr.wallet', 'w')
            .leftJoinAndSelect('addr.tokenWallets', 'tw')
            //.leftJoinAndSelect('tw.address', 'twaddr')
            .leftJoinAndSelect('tw.token', 't')

            .leftJoinAndSelect('addr.xpub', 'x')
            .leftJoinAndSelect('x.coin', 'c')

            //.leftJoinAndSelect('addr.account', 'ac')

            .where('u.id = :id', {id})
            .getOne();
    }

    public async findByEmail(email: string) {
        return await this.dataSource.getRepository(User).createQueryBuilder('u')
            .leftJoinAndSelect('u.account', 'acc')
            .leftJoinAndSelect('u.addresses', 'addr')
            .leftJoinAndSelect('addr.wallet', 'w')
            .leftJoinAndSelect('addr.tokenWallets', 'tw')
            .leftJoinAndSelect('tw.token', 't')
            .where('u.email = :email', {email})
            .getOne();
    }

    public async findByApiKey(key: string) {
        return await this.dataSource.getRepository(User).createQueryBuilder('u')
            .leftJoinAndSelect('u.account', 'acc')
            .leftJoinAndSelect('u.addresses', 'addr')
            .leftJoinAndSelect('acc.transactions', 'txs')

            .leftJoinAndSelect('addr.wallet', 'w')
            //.leftJoinAndSelect('w.address', 'addr')

            .leftJoinAndSelect('addr.xpub', 'x')
            .leftJoinAndSelect('x.coin', 'c')

            .leftJoinAndSelect('addr.tokenWallets', 'tw')
            .leftJoinAndSelect('tw.token', 't')
            //.leftJoinAndSelect('tw.address', 'twaddr')

            .where('u.apiKey = :key', {key})
            .getOne();
    }

    public async findOneForAdminPanel(id: number) {
        return await this.dataSource.getRepository(User).createQueryBuilder('u')
            .leftJoinAndSelect('u.account', 'acc')
            .where('u.id = :id', {id})
            .getOne();
    }

    public async findAll() {
        return await this.dataSource.getRepository(User).createQueryBuilder('u')
            .leftJoinAndSelect('u.account', 'acc')
            .getMany();
    }
}