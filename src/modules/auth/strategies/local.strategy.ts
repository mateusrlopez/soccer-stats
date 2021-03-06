import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '@user/entities/user.entity';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            passwordField: 'password',
            session: false,
            usernameField: 'email',
        });
    }

    public async validate(email: string, password: string): Promise<User> {
        return this.authService.validate(email, password);
    }
}
