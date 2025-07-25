import { Controller, Injectable, UseGuards } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { Crud, CrudRequest } from '@nestjsx/crud';
import {Transaction} from "../account/entities/transaction.entity";
import { CrudAccessGuard } from '../guards/crud-access.guard';
import { TransactionRepository } from '../account/repositories/transaction.repository';
import {AddressRepository} from "../xpubgenerator/repositories/address.repository";

@Injectable()
export class TransactionsService extends TypeOrmCrudService<Transaction> {
    constructor(
        public repository: TransactionRepository,
        private addressRepository: AddressRepository,
    ) {
        super(repository)
    }

    override async getMany(req: CrudRequest): Promise<Transaction[]> {
        const transactions = await this.repository.findAll();

        for (let tx of transactions) {
            const path = await this.addressRepository.getDerivationPath(tx.addressTo);
            tx.addressTo = tx.addressTo + ` (${path?.path})`;
        }

        return transactions;
    }

}

//@UseGuards(CrudAccessGuard)
@Crud({
    model: {
        type: Transaction
    }
})
@Controller('crud/transactions')
export class CrudTransactionsController {
    constructor(public service: TransactionsService){}
}