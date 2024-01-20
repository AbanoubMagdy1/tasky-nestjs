import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {UserI} from 'src/schemas/user.schema';
import { RegisterDto } from './dto/registerDto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private userModel: Model<UserI>) {}

    async create(registerDto: RegisterDto) {
        const foundUser = await this.userModel.findOne({ username: registerDto.username });
        if(foundUser) {
            throw new HttpException('User already exists', 400);
        }

        const user = await this.userModel.create(registerDto);
        const token = user.generateAccessToken();
        user.password = undefined;
        return { user, token};
    }

    async login(username: string, password: string) {
        const user = await this.userModel.findOne({ username }).select('-password');

        if(!user) {
            throw new HttpException('User not found', 404);
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            throw new HttpException('Invalid credentials', 401);
        }

        const token = user.generateAccessToken();
        return { user, token };
    }

}
