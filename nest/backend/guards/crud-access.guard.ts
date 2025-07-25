import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException
} from '@nestjs/common';
import { env } from 'process';
import {SecurityFetchMode} from "./enums/http";

@Injectable()
export class CrudAccessGuard implements CanActivate {

    constructor() {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const {host, accept, referer} = request.headers;
        const securityFetchMode = request.headers['sec-fetch-mode'];

        if (!securityFetchMode || !referer || request.headers['sec-fetch-mode'] == SecurityFetchMode.NAVIGATE) {
            throw new NotFoundException('Page not found');
        }

        if (securityFetchMode == SecurityFetchMode.CORS) {
            return (env.NODE_ENV == 'dev' && !!referer.match('localhost')) || !!referer.match(host);
        }

        return false;
    }
}