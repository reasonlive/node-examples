import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export class User1694544996870 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
        let hash = await bcrypt.hash('cryptocrypto', 10);
        await queryRunner.query(
          `INSERT INTO user (email, password, roles, apiKey) VALUES ('admin@gmail.com', '${hash}', 'admin', '${v4()}');`,
        );

        await queryRunner.query(`INSERT INTO account (name) VALUES ('TEST');`);

        await queryRunner.query(`UPDATE user SET user.accountId=1 WHERE user.id=1;`);

        hash = await bcrypt.hash('test', 10);
        await queryRunner.query(
            `INSERT INTO user (email, password, roles, apiKey) VALUES ('test@gmail.com', '${hash}', 'user,merchant', '${v4()}');`
        );

        await queryRunner.query(`UPDATE user SET user.accountId=1 WHERE user.id=2;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user;`);
        await queryRunner.query('DROP TABLE account;');
    }
}
