import { Module } from '@nestjs/common';
import {User} from "./entities/user.entity";
import {AccountController} from "./account.controller";
import {WalletRepository} from "../xpubgenerator/repositories/wallet.repository";
import {XpubgeneratorService} from "../xpubgenerator/xpubgenerator.service";
import {AccountService} from "./account.service";
import {XpubgeneratorModule} from "../xpubgenerator/xpubgenerator.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import { AuthService } from './auth.service';
import {UserRepository} from "./repositories/user.repository";
import { Account } from './entities/account.entity';
import {AccountRepository} from "./repositories/account.repository";

import {env} from 'process';
import { PaymentController } from './payment.controller';
import { BlockchainModule } from 'src/blockchain/blockchain.module';
import {TransactionRepository} from "./repositories/transaction.repository";
import Logger from "../logger";


@Module({
    imports: [
        XpubgeneratorModule,
        JwtModule.register({secret: env.JWT_SECRET_KEY, signOptions: {expiresIn: '12h'}}),
        BlockchainModule,
    ],
    exports: [AuthService, UserRepository, AccountRepository, TransactionRepository],
    controllers: [AccountController, PaymentController],
    providers: [
        AccountService,
        AuthService,
        UserRepository,
        AccountRepository,
        TransactionRepository,
        JwtService,
        Logger,
    ]
})
export class AccountModule {}
