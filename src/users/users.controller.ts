import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/registerDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto){
    const user = await this.usersService.create(registerDto);
    return user;
  }

  @Post("login")
  async login(@Body() registerDto: RegisterDto){
    const user = await this.usersService.login(registerDto.username, registerDto.password);
    return user;
  }
}
