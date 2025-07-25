import {Module} from "@nestjs/common";
import {CrudUsersController, UsersService} from "./users.controller";
import { AccountModule } from "src/account/account.module";
import { CrudWalletsController, WalletsService } from "./wallets.controller";
import { XpubgeneratorModule } from "src/xpubgenerator/xpubgenerator.module";
import {CrudXpubsController, XpubsService} from "./xpubs.controller";
import {CrudTokenWalletsController, TokenWalletsService} from "./tokenWallets.controller";
import { CrudTransactionsController, TransactionsService } from './transactions.controller';
import {AccountsService, CrudAccountsController } from "./accounts.controller";
import {AddressesService, CrudAddressesController} from "./addresses.controller";
import {CrudCommonController} from "./common.controller";
import { CoinsService, CrudCoinsController } from "./coins.controller";
import { CrudTokensController, TokensService } from "./tokens.controller";

@Module({
    imports: [
        AccountModule,
        XpubgeneratorModule,
    ],
    exports: [],
    controllers: [
        CrudUsersController,
        CrudWalletsController,
        CrudXpubsController,
        CrudTokenWalletsController,
        CrudTransactionsController,
        CrudAccountsController,
        CrudAddressesController,
        CrudCommonController,
        CrudCoinsController,
        CrudTokensController
    ],
    providers: [
        UsersService,
        WalletsService,
        TokenWalletsService,
        XpubsService,
        TransactionsService,
        AccountsService,
        AddressesService,
        CoinsService,
        TokensService
    ]
})
export class CrudModule {}