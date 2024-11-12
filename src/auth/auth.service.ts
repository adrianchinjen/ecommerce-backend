import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async userSignUp(signUpCredentials: CreateUserDto) {
    // const { email, username, password } = signUpCredentials;
    return signUpCredentials;
  }
}
