import {AppDataSource} from './data-source';

AppDataSource.initialize()
    .then(() => {
        console.log("Database schema has been initialized!");
        process.exit();
    })
    .catch((err) => {
        console.error("Error during Database schema initialization", err);
        process.exit();
    })