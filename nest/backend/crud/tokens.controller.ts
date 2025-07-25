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
import { Token } from "../xpubgenerator/entities/token.entity";
import { TokenRepository } from "../xpubgenerator/repositories/token.repository";

@Injectable()
export class TokensService extends TypeOrmCrudService<Token> {
    constructor(public repository: TokenRepository) {
        super(repository)
    }

    override async getMany(req: CrudRequest): Promise<Token[]> {
        return await this.repository.findAll();
    }

    override async getOne(req: CrudRequest): Promise<Token> {
        const field: QueryFilter[] = req.parsed.paramsFilter
            .filter((item: QueryFilter): boolean => item.field === 'id');

        return await this.repository.get(field[0].value);
    }
}

//@UseGuards(CrudAccessGuard)
@Crud({
    model: {
        type: Token
    }
})
@Controller('crud/tokens')
export class CrudTokensController {
    constructor(public service: TokensService){}
}