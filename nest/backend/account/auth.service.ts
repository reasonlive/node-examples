import {ForbiddenException, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserRepository} from "./repositories/user.repository";
import * as bcrypt from 'bcrypt';
import {User} from "./entities/user.entity";

import {env} from 'process';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) {

    }

    public async validateToken(token: string) {
        return this.jwtService.verify(token, {
            secret : env.JWT_SECRET_KEY
        });
    }

    public signPayload(payload: object) {
        return this.jwtService.sign(payload, {secret: env.JWT_SECRET_KEY});
    }

    public async authorize(email: string, password: string): Promise<User|null> {
        const errorObject = {'message': 'access is forbidden'};

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new ForbiddenException(errorObject);
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            throw new ForbiddenException(errorObject);
        }

        return user;
    }

    public async getUserIdFromToken(token: string): Promise<number | null> {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.slice(7);
            }

            const payload = this.jwtService.decode(token);

            if (payload && typeof payload === 'object' && 'sub' in payload) {
                return parseInt(payload.sub, 10);
            }

            return null;
        } catch (error) {
            return null;
        }
    }
}