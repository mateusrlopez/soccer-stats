import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { HashHelper } from '@shared/helpers/hash.helper';
import { ICreateUser } from '@user/interfaces/create-user.interface';
import { IUser } from '@user/interfaces/user.interface';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    public async register(createUserDto: ICreateUser): Promise<IUser> {
        return this.userService.create(createUserDto);
    }

    public async validate(email: string, password: string): Promise<IUser> {
        const user = await this.userService.findByEmail(email, false);

        if (typeof user === 'undefined' || !HashHelper.compare(password, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    public async retrieveUser(email: string): Promise<IUser> {
        const user = this.userService.findByEmail(email, false);

        if (typeof user === 'undefined') {
            throw new UnauthorizedException('Invalid user');
        }

        return user;
    }

    public async assignToken(user: IUser): Promise<string> {
        return this.jwtService.signAsync(user.email);
    }
}
