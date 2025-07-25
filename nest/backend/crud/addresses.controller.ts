import {Controller, Injectable, UseGuards, Body, Post, Res, HttpStatus} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Crud, CrudRequest} from "@nestjsx/crud";
import {UserRepository} from '../account/repositories/user.repository';
import {XpubgeneratorService} from '../xpubgenerator/xpubgenerator.service';
import {QueryFilter} from "@nestjsx/crud-request";
import {CrudAccessGuard} from "../guards/crud-access.guard";
import {Address} from "../xpubgenerator/entities/address.entity";
import {AddressRepository} from "../xpubgenerator/repositories/address.repository";
import BIPExtendedKeysGenerator from "../xpubgenerator/bips/bip-extended-keys-generator";


@Injectable()
export class AddressesService extends TypeOrmCrudService<Address> {
    constructor(public repository: AddressRepository) {
        super(repository)
    }

    override async getMany(req: CrudRequest): Promise<Address[]> {
        return await this.repository.findAll();
    }

    override async getOne(req: CrudRequest): Promise<Address> {
        const field: QueryFilter[] = req.parsed.paramsFilter
            .filter((item: QueryFilter): boolean => item.field === 'id');

        return await this.repository.get(field[0].value);
    }
}

//@UseGuards(CrudAccessGuard)
@Crud({
    model: {
        type: Address
    }
})
@Controller('crud/addresses')
export class CrudAddressesController {
    constructor(
        public service: AddressesService,
        private userRepository: UserRepository,
        private xpubGen: XpubgeneratorService,
    ){
    }

    @Post('/key')
    public async getAddressPrivateKey(@Body() body, @Res() res) {
        if (!body.secret || !body.path) {
            return null;
        }

        try {
            const privateKey = BIPExtendedKeysGenerator.getPrivateKey(body.secret, body.path);
            return res.status(HttpStatus.OK).json({key: privateKey})
        }
        catch (err) {
            return null;
        }
    }
}