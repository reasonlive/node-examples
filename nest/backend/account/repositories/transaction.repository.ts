import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Transaction } from "../entities/transaction.entity";
import { TransactionDirection, TransactionStatus } from "../enums/transaction";
import { User } from "../entities/user.entity";
import { Address } from "../../xpubgenerator/entities/address.entity";
import { BlockchainTransactionDto } from "../dto/blockchain-transaction.dto";
import { UserRepository } from "./user.repository";
import { env } from "process";
import { BlockchainNetworkType } from "../../blockchain/enums/blockchain";


@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(
      private dataSource: DataSource,
      //private userRepository: UserRepository
  ) {
    super(Transaction, dataSource.createEntityManager());
  }

  /**
   * Creates transaction without saving
   * @param dto BlockchainTransactionDto
   */
  public createTransaction(dto: BlockchainTransactionDto) {
    const transaction = new Transaction();
        transaction.txid = dto.hash;
        transaction.addressFrom = dto.from;
        transaction.addressTo = dto.to;

        transaction.status = dto.status ?? TransactionStatus.SUCCESS;

        transaction.amount = dto.amount;
        transaction.blockchainFee = dto.fee;
        transaction.created = new Date(dto.timestamp);

        if (env.NODE_ENV === 'dev') {
            transaction.networkType = BlockchainNetworkType.TESTNET;
        }

        return transaction;
  }

    /**
     * Complex sql transaction with saving transaction and wallet balance
     * @param txdto
     * @param address
     */
  public async createInSqlTransaction(txdto: BlockchainTransactionDto, address: Address) {
    await this.manager.transaction(async (manager) => {
        const newTx = this.createTransaction(txdto);

        newTx.account = address.user.account;
        newTx.currency = address.xpub.coin.name;

        if (txdto.token) {
            const wallet = address.tokenWallets.find(wallet => wallet.token.standard == txdto.token);
            newTx.currency = wallet.token.name;
            newTx.tokenStandard = wallet.token.standard;

            if (txdto.to === address.val) {
                wallet.balance += txdto.amount;
                newTx.fee = txdto.amount * newTx.account.mdr / 100;
            }
            else if (txdto.from === address.val) {
                wallet.balance -= txdto.amount;
            }

            await manager.save(wallet);
        }
        else {
            if (txdto.to === address.val) {
                address.balance += txdto.amount;
                newTx.fee = txdto.amount * newTx.account.mdr / 100;
            }
            else if (txdto.from === address.val) {
                address.balance -= txdto.amount;
            }

            await manager.save(address);
        }

        await manager.save(newTx);
    })
  }

  public async findByHash(txid: string) {
      return await this.dataSource.getRepository(Transaction).createQueryBuilder('tx')
          .leftJoinAndSelect('tx.account', 'acc')
          .where('tx.txid = :txid', {txid})
          .getOne();
  }

    public async findByAddressTo(address: string) {
        return await this.dataSource.getRepository(Transaction).createQueryBuilder('tx')
            .leftJoinAndSelect('tx.account', 'acc')
            .where('tx.addressTo = :address', {address})
            .getOne();
    }

    public async findLastByAddressTo(address: string) {
        return await this.dataSource.getRepository(Transaction).createQueryBuilder('tx')
            .where('tx.addressTo = :address', {address})
            .orderBy('tx.id', 'DESC')
            .orderBy('tx.created', 'DESC')
            .getOne();
    }

    public async findUserTransactions(user: User, direction: TransactionDirection = TransactionDirection.INCOMING) {
        const addresses: string[] = await this.dataSource.getRepository(Address)
            .createQueryBuilder('addr')
            .select('addr.val')
            .where('addr.user.id = :id', {id: user.id})
            .getRawMany();

        let builder = await this.dataSource.getRepository(Transaction).createQueryBuilder('tx')
            .leftJoin('tx.account', 'acc')
            .where('tx.direction', {direction});

        if (direction == TransactionDirection.INCOMING) {
            builder = builder.andWhere('tx.addressTo IN (:addresses)', {addresses});
        }
        else {
            builder = builder.andWhere('tx.addressFrom IN (:addresses)', {addresses});
        }

        return await builder.getMany();
    }

    public async findAll(): Promise<Transaction[]> {
    return await this.dataSource.getRepository(Transaction).createQueryBuilder('tx')
        .leftJoinAndSelect('tx.account', 'acc')
        .getMany();
    }
}