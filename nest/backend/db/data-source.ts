const DataSource = require('typeorm').DataSource;
require('dotenv').config();
import {env} from 'process';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    autoloadEntities: true,
    entities: [
        'src/xpubgenerator/entities/**/*.ts',
        'src/transaction/entities/**/*.ts',
        'src/account/entities/**/*.ts'
    ],
    //subscribers: [],
    migrations: [
        'src/xpubgenerator/migrations/**/*.ts',
        'src/account/migrations/**/*.ts',
        'src/transaction/migrations/**/*.ts',
    ]
});