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

@Injectable()
export class AccountsService extends TypeOrmCrudService<Account> {
    constructor(public repository: AccountRepository) {
        super(repository)
    }

    override async getMany(req: CrudRequest): Promise<Account[]> {
        return await this.repository.findAll();
    }

    override async getOne(req: CrudRequest): Promise<Account> {
        const field: QueryFilter[] = req.parsed.paramsFilter
            .filter((item: QueryFilter): boolean => item.field === 'id');

        return await this.repository.get(field[0].value);
    }
}

//@UseGuards(CrudAccessGuard)
@Crud({
    model: {
        type: Account
    }
})
@Controller('crud/accounts')
export class CrudAccountsController {
    constructor(public service: AccountsService){}
}