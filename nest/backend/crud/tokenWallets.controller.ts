import {Controller, Injectable, UseGuards} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Crud, CrudRequest} from "@nestjsx/crud";
import {TokenWalletRepository} from "../xpubgenerator/repositories/token-wallet.repository";
import {TokenWallet} from "../xpubgenerator/entities/token.wallet.entity";
import {QueryFilter} from "@nestjsx/crud-request";
import {CrudAccessGuard} from "../guards/crud-access.guard";
import { Token } from "../xpubgenerator/entities/token.entity";

@Injectable()
export class TokenWalletsService extends TypeOrmCrudService<TokenWallet> {
    constructor(public repository: TokenWalletRepository) {
        super(repository)
    }

    override async getOne(req: CrudRequest): Promise<TokenWallet> {
        const field: QueryFilter[] = req.parsed.paramsFilter
            .filter((item: QueryFilter): boolean => item.field === 'id');

        return await this.repository.get(field[0].value);
    }

    override async getMany(req: CrudRequest): Promise<TokenWallet[]> {
        return await this.repository.findAll();
    }
}

//@UseGuards(CrudAccessGuard)
@Crud({
    model: {
        type: TokenWallet
    }
})
@Controller('crud/tokenWallets')
export class CrudTokenWalletsController {
    constructor(public service: TokenWalletsService){}
}