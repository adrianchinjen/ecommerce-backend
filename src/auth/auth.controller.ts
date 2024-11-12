import { Body, Controller, Get, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('signup')
  async signup(@Body(ValidationPipe) signUpCredentials: CreateUserDto) {
    const user = await this.authService.userSignUp(signUpCredentials);
    return user;
  }
}
