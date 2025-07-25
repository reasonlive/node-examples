import {User} from "../account/entities/user.entity";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Controller, Injectable, UseGuards} from "@nestjs/common";
import {Crud, CrudRequest} from "@nestjsx/crud";
import {UserRepository} from "../account/repositories/user.repository";
import {CrudAccessGuard} from "../guards/crud-access.guard";
import {AccountRepository} from "../account/repositories/account.repository";
import {Account} from "../account/entities/account.entity";
import {QueryFilter} from "@nestjsx/crud-request";
import { Coin } from "../xpubgenerator/entities/coin.entity";
import { CoinRepository } from "../xpubgenerator/repositories/coin.repository";

@Injectable()
export class CoinsService extends TypeOrmCrudService<Coin> {
    constructor(public repository: CoinRepository) {
        super(repository)
    }

    override async getMany(req: CrudRequest): Promise<Coin[]> {
        return await this.repository.findAll();
    }

    override async getOne(req: CrudRequest): Promise<Coin> {
        const field: QueryFilter[] = req.parsed.paramsFilter
            .filter((item: QueryFilter): boolean => item.field === 'id');

        return await this.repository.get(field[0].value);
    }
}

//@UseGuards(CrudAccessGuard)
@Crud({
    model: {
        type: Coin
    }
})
@Controller('crud/coins')
export class CrudCoinsController {
    constructor(public service: CoinsService){}
}