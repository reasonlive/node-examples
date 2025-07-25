import {Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards} from "@nestjs/common";
import {XpubgeneratorService} from "../xpubgenerator/xpubgenerator.service";
import {TokenGuard} from "../guards/token.guard";
import {AuthService} from "./auth.service";
import {UserRepository} from "./repositories/user.repository";
import {UserRole} from "./enums/user-role";
import {ExistingWalletDto} from "../xpubgenerator/dto/wallet.dto";
import {AddressType} from "../xpubgenerator/enums/address";
import BlockchainService from "src/blockchain/blockchain.service";
import {AccountService} from "./account.service";
import {TokenStandard} from "src/xpubgenerator/enums/token";
import {TransactionRepository} from "./repositories/transaction.repository";
import {v4} from "uuid";
import {Account} from "./entities/account.entity";
import Logger from "../logger";
import {AccountRepository} from "./repositories/account.repository";
import {WalletRepository} from "../xpubgenerator/repositories/wallet.repository";
import ISubscriberOptions from "../blockchain/subscribers/subscriber-options";
import {APICallReason} from "../blockchain/enums/api-calls";


@Controller('api/account')
export class AccountController {

    constructor(
        private authService: AuthService,
        private xpubgen: XpubgeneratorService,
        private userRepository: UserRepository,
        private accountRepository: AccountRepository,
        private blockchainService: BlockchainService,
        private accountService: AccountService,
        private txRepository: TransactionRepository,
        private walletRepository: WalletRepository,
        private logger: Logger
    ) {
    }

    @Post('/login')
    async login(@Body() req, @Res() res) {
        try {
            const user = await this.authService.authorize(req.email, req.password);
            const payload = {
                username: user.email,
                admin: user.roles.includes(UserRole.ADMIN),
                sub: user.id
            };

            if (user && !user.addresses?.length) {
                await this.xpubgen.createWallets(user);
            }

            return res.status(HttpStatus.OK).json({token: this.authService.signPayload(payload)})
        }
        catch (err: any) {
            console.log(err)
            await this.logger.error(err.message);
            return res.status(HttpStatus.FORBIDDEN).json({error: err.name, message: err.message})
        }
    }


    /*@Get('/wallets/create')
    async createWallets(@Req() req): Promise<ExistingWalletDto[]> {
        const user = await this.userRepository.get(1);

        return await this.xpubgen.createWallets(user);
    }*/

    @UseGuards(TokenGuard)
    @Get('/wallets/get')
    async getWallets(@Req() req, @Res() res) {
        const userId = req.decodedData?.sub;

        const user = await this.userRepository.get(userId);
        if (!user) {
            return res.status(HttpStatus.FORBIDDEN).json({error: 'Access is forbidden'});
        }

        return res.status(HttpStatus.OK).json({wallets:await this.accountService.getWallets(user)});
    }

    @UseGuards(TokenGuard)
    @Get('/settings/get')
    async getSettings(@Req() req, @Res() res) {
        const userId = req.decodedData?.sub;

        const user = await this.userRepository.get(userId);
        if (!user) {
            return res.status(HttpStatus.FORBIDDEN).json({error: 'Access is forbidden'});
        }

        const settings = {
            apiKey: user.apiKey,
            callbackUrl: user.account.callbackUrl
        }

        return res.status(HttpStatus.OK).json({settings});
    }

    @UseGuards(TokenGuard)
    @Post('/apiKey/create')
    async createMerchantApiKey(@Req() req, @Res() res) {
        const userId = req.decodedData?.sub;

        if (userId && !isNaN(userId)) {
            let user = await this.userRepository.get(userId);

            if (!user) {
                return res.status(HttpStatus.FORBIDDEN).json({error: 'Access is forbidden'});
            }

            const apiKey = v4();

            user = await this.userRepository.save({...user, apiKey});

            return res.status(HttpStatus.OK).json({apiKey: user.apiKey})
        }
        else {
            return res.status(HttpStatus.BAD_REQUEST).json({error: 'Bad request'});
        }
    }

    @UseGuards(TokenGuard)
    @Post('/callbackUrl/create')
    async createCallbackUrl(@Req() req, @Body() body, @Res() res){
        const userId = req.decodedData?.sub;

        if (userId && !isNaN(userId) && body.callbackUrl) {
            let user = await this.userRepository.get(userId);

            if (!user) {
                return res.status(HttpStatus.FORBIDDEN).json({error: 'Access is forbidden'});
            }

            user.account.callbackUrl = body.callbackUrl;
            await this.userRepository.manager.getRepository(Account).save(user.account);

            return res.status(HttpStatus.OK);
        }
        else {
            return res.status(HttpStatus.BAD_REQUEST).json({error: 'Bad request'});
        }
    }

    @UseGuards(TokenGuard)
    @Post('/address/create')
    async createPaymentAddress(@Req() req, @Body() body, @Res() res) {
        const userId = req.decodedData?.sub;
        let walletId = body.walletId;

        if (!walletId) {
            return res.status(HttpStatus.BAD_REQUEST).json({error: 'wallet id is not provided'});
        }

        walletId = walletId.includes('-') ? walletId.split('-')[0] : walletId;

        const user = await this.userRepository.get(userId);
        if (!user) {
            return res.status(HttpStatus.FORBIDDEN).json({error: 'Access is forbidden'});
        }

        let wallet;
        //TODO: TOO MUCH ADDRESSES MAY BE, NEED TO INVOKE FROM addressRepository
        user.addresses.forEach((address) => {
            if (address.wallet.id == walletId) wallet = address.wallet;
        });

        if (!wallet) {
            return res.status(HttpStatus.BAD_REQUEST).json({error: 'No such wallet'});
        }

        const addr = await this.xpubgen.generateDynamicAddress(wallet);

        let options: ISubscriberOptions = {
            callbackUrl: user.account.callbackUrl,
            usdt: addr.tokenWallets?.length ? addr.tokenWallets.map(tw => tw.token.standard) : null,
            reason: APICallReason.TRANSACTIONS,
            repository: this.txRepository
        };

        this.accountService.includeAddressInBlockchainObserver(addr, options);

        return res.status(HttpStatus.OK).json({address: addr});
    }

    @UseGuards(TokenGuard)
    @Get('/addresses/get')
    async getPaymentAddresses(@Req() req, @Res() res) {
        const user = await this.userRepository.get(req.decodedData?.sub);

        if (!user) {
            return res.status(HttpStatus.FORBIDDEN).json({error: 'Access is forbidden'});
        }

        const addresses = user.addresses
            .filter(addr => addr.type == AddressType.DYNAMIC);

        let result: Array<any> = addresses.map((addr: any) => {
            addr.type = addr.type == AddressType.STATIC ? 'static' : 'dynamic';
            return addr;
        });

        return res.status(HttpStatus.OK).json({addresses: result});
    }

    @UseGuards(TokenGuard)
    @Get('/transactions/get')
    async getUpdatedUserStuff(@Req() req, @Res() res) {
        const user = await this.userRepository.get(req.decodedData?.sub);

        if (!user) {
            return res.status(HttpStatus.FORBIDDEN).json({error: 'Access is forbidden'});
        }

        try {
            await this.accountService.updateUserWalletTransactions(user, 500);
        }
        catch (err) {
            console.log(err);
            await this.logger.error(err.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error : 'transactions was not updated, try again'});
        }

        const account = await this.accountRepository.get(user.account.id);

        return res.status(HttpStatus.OK).json({
            transactions: this.accountService.getWalletTransactions(account, user),
            wallets: await this.accountService.getWallets(user)
        });
    }

    @UseGuards(TokenGuard)
    @Get('/acquiring/transactions/get')
    async getAcquiringTransactions(@Req() req, @Res() res) {
        const user = await this.userRepository.get(req.decodedData?.sub);

        if (!user) {
            return res.status(HttpStatus.FORBIDDEN).json({error: 'Access is forbidden'});
        }

        const account = await this.accountRepository.get(user.account.id);

        return res.status(HttpStatus.OK).json({
            transactions: this.accountService.getAddressTransactions(account, user),
            info: await this.accountService.getAddressTransactionsInfo(account, user)
        });
    }
}