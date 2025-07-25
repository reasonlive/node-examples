import {Controller, Injectable, UseGuards, Body, Post} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Crud, CrudRequest} from "@nestjsx/crud";
import {WalletRepository} from "../xpubgenerator/repositories/wallet.repository";
import {UserRepository} from '../account/repositories/user.repository';
import {XpubgeneratorService} from '../xpubgenerator/xpubgenerator.service';
import {Wallet} from "../xpubgenerator/entities/wallet.entity";
import {TokenWallet} from "../xpubgenerator/entities/token.wallet.entity";
import {QueryFilter} from "@nestjsx/crud-request";
import {CrudAccessGuard} from "../guards/crud-access.guard";


@Injectable()
export class WalletsService extends TypeOrmCrudService<Wallet> {
    constructor(public repository: WalletRepository) {
        super(repository)
    }

    override async getMany(req: CrudRequest): Promise<Wallet[]> {
        return await this.repository.findAll();
    }

    override async getOne(req: CrudRequest): Promise<Wallet> {
        const field: QueryFilter[] = req.parsed.paramsFilter
            .filter((item: QueryFilter): boolean => item.field === 'id');

        return await this.repository.get(field[0].value);
    }
}

//@UseGuards(CrudAccessGuard)
@Crud({
    model: {
        type: Wallet
    }
})
@Controller('crud/wallets')
export class CrudWalletsController {
    constructor(
        public service: WalletsService,
        private userRepository: UserRepository,
        private xpubGen: XpubgeneratorService,
    ){}

    @Post('/create/rest/all')
    async createUserWallets(@Body() body): Promise<Boolean> {
        const user = await this.userRepository.get(body.userId);
        if (!user || user.addresses.length) {
            return false;
        }

        try {
            const wallets = await this.xpubGen.createWallets(user);
            return !!wallets.length;
        }
        catch (err) {
            return false;
        }
    }
}