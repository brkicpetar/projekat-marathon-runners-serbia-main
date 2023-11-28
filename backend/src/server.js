import express from 'express';
import cors from 'cors';
import {database} from './db/index.js';
import {userRouter} from './routers/user.router.js';


async function main(){
    const app = express();

    console.log('___  ___                _   _                  ______                                  _____           _     _       \r\n|  \\\/  |               | | | |                 | ___ \\                                \/  ___|         | |   (_)      \r\n| .  . | __ _ _ __ __ _| |_| |__   ___  _ __   | |_\/ \/   _ _ __  _ __   ___ _ __ ___  \\ `--.  ___ _ __| |__  _  __ _ \r\n| |\\\/| |\/ _` | \'__\/ _` | __| \'_ \\ \/ _ \\| \'_ \\  |    \/ | | | \'_ \\| \'_ \\ \/ _ \\ \'__\/ __|  `--. \\\/ _ \\ \'__| \'_ \\| |\/ _` |\r\n| |  | | (_| | | | (_| | |_| | | | (_) | | | | | |\\ \\ |_| | | | | | | |  __\/ |  \\__ \\ \/\\__\/ \/  __\/ |  | |_) | | (_| |\r\n\\_|  |_\/\\__,_|_|  \\__,_|\\__|_| |_|\\___\/|_| |_| \\_| \\_\\__,_|_| |_|_| |_|\\___|_|  |___\/ \\____\/ \\___|_|  |_.__\/|_|\\__,_|\n\n')

    await database.initialize();

    app.use(express.json());
    app.use(cors());
    app.use('/user', userRouter);

    app.listen(4000, () => {
        console.log(`[${new Date().toISOString()}] Server is up and running!`);
    });
}

main();