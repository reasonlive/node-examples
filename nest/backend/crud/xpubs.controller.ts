import {Controller, Injectable, UseGuards} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Crud, CrudRequest} from "@nestjsx/crud";
import {XpubRepository} from "../xpubgenerator/repositories/xpub.repository";
import {Xpub} from "../xpubgenerator/entities/xpub.entity";
import {CrudAccessGuard} from "../guards/crud-access.guard";

@Injectable()
export class XpubsService extends TypeOrmCrudService<Xpub> {
    constructor(public repository: XpubRepository) {
        super(repository)
    }

    override async getMany(req: CrudRequest): Promise<Xpub[]> {
        return await this.repository.findAll();
    }
}

//@UseGuards(CrudAccessGuard)
@Crud({
    model: {
        type: Xpub
    }
})
@Controller('crud/xpubs')
export class CrudXpubsController {
    constructor(public service: XpubsService){}
}