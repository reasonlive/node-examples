import {Controller, Get, HttpStatus, Injectable, Param, Res, UseGuards} from "@nestjs/common";
import {CrudAccessGuard} from "../guards/crud-access.guard";
import Launcher from "../blockchain/observers/launcher";

enum ObserverStatus {
    WORKING = 'WORKING',
    STOPPED = 'STOPPED',
}

//@UseGuards(CrudAccessGuard)
@Controller('crud/common')
export class CrudCommonController {
    constructor(){

    }

    @Get('/observers/list')
    public async getListOfObservers(@Res() res) {
        const observers = Launcher.getObservers();
        const result: Array<any> = [];
        observers.forEach(obs => {
            const obj = {
                name: obs.blockchain,
                status: obs.isObserving ? ObserverStatus.WORKING : ObserverStatus.STOPPED,
                service: Launcher.getBlockchainProvider(obs.blockchain),
                requests: obs.requestsCounter,
                transactions: obs.transactionsCounter
            }

            result.push(obj)
        })

        return res.status(HttpStatus.OK).json({observers: result});
    }

    @Get('/observer/stop/:name')
    public async stopObserver(@Param('name') name, @Res() res) {
        Launcher.stop(false, name);
        const observer = Launcher.getObserver(name);
        return res.status(HttpStatus.OK).json({success: !observer.isObserving});
    }

    @Get('/observer/start/:name')
    public async startObserver(@Param('name') name, @Res() res) {
        Launcher.start(name);
        const observer = Launcher.getObserver(name);
        return res.status(HttpStatus.OK).json({success: observer.isObserving});
    }

    @Get('/observer/restart/:name')
    public async restartObserver(@Param('name') name, @Res() res) {
        return res.status(HttpStatus.OK).json({observer: Launcher.getObserver(name)});
    }
}