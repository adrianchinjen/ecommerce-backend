import { Body, Controller, Get, Post, Res, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/createUser.dto';
import { Response } from 'express';
// import { Public } from './decorators/public.decorator';

@Controller('auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) signUpCredentials: CreateUserDto) {
    const user = await this.authService.userSignUp(signUpCredentials);
    return user;
  }

  @Post('signin')
  async signin(@Body(ValidationPipe) signInCredentials: LoginUserDto, @Res() response: Response) {
    const testing = await this.authService.userSignIn(signInCredentials, response);
    return testing;
  }

  @Get('fetchPeople')
  getPeople() {
    return 'you are authenticated';
  }
}
