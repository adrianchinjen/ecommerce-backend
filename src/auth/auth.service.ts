import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { user_role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private databaseService: DatabaseService
  ) {}

  async userSignUp(signUpCredentials: CreateUserDto) {
    const { email, password, username } = signUpCredentials;

    const isEmailExisting = await this.userService.checkUserEmail(email);

    if (isEmailExisting) {
      throw new ConflictException('User already exist');
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const authData = {
      username,
      email,
      password: hashedPassword,
      roles: [user_role.user]
    };

    const saveAuthData = await this.databaseService.auth.create({
      data: authData
    });

    const userData = {
      username: saveAuthData.username,
      email: saveAuthData.email,
      roles: saveAuthData.roles,
      auth_id: saveAuthData.id
    };

    const saveUserInfo = await this.userService.saveUser(userData);

    return saveUserInfo;
  }
}
