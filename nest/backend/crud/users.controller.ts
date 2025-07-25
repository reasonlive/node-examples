import {User} from "../account/entities/user.entity";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Controller, Injectable, UseGuards} from "@nestjs/common";
import {Crud, CrudRequest} from "@nestjsx/crud";
import {UserRepository} from "../account/repositories/user.repository";
import {CrudAccessGuard} from "../guards/crud-access.guard";
import {QueryFilter} from "@nestjsx/crud-request";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(public repository: UserRepository) {
        super(repository)
    }

    override async getMany(req: CrudRequest): Promise<User[]> {
        return await this.repository.findAll();
    }

    override async getOne(req: CrudRequest): Promise<User> {
        const field: QueryFilter[] = req.parsed.paramsFilter
            .filter((item: QueryFilter): boolean => item.field === 'id');

        return await this.repository.findOneForAdminPanel(field[0].value);
    }
}

//@UseGuards(CrudAccessGuard)
@Crud({
    model: {
        type: User
    }
})
@Controller('crud/users')
export class CrudUsersController {
    constructor(public service: UsersService){}
}