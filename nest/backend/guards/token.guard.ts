import {Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException} from '@nestjs/common';
import { Observable } from 'rxjs';
import { env } from 'process';
import { AuthService } from 'src/account/auth.service';

@Injectable()
export class TokenGuard implements CanActivate {

    constructor(private readonly authService: AuthService) {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const { authorization }: any = request.headers;

            if (!authorization || authorization.trim() === '') {
                throw new UnauthorizedException('Please provide token');
            }

            const authToken = authorization.replace(/bearer/gim, '').trim();
            request.decodedData = await this.authService.validateToken(authToken);

            return true;
        }
        catch (error) {
            console.log('auth error - ', error.message);
            throw new ForbiddenException(error.message || 'session expired! Please sign In');
        }
    }
}