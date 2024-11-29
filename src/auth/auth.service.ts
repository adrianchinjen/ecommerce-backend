import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { user_role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

interface SignInDetails {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async userSignUp(signUpCredentials: CreateUserDto) {
    const { email, password, username } = signUpCredentials;

    const isEmailExisting = await this.userService.verifyEmail(email);
    const isUsernameExisting = await this.userService.verifyUsername(username);

    if (isEmailExisting) {
      throw new ConflictException('User already exist');
    }

    if (isUsernameExisting) {
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

  async userSignIn(signInCredntials: SignInDetails, response: any) {
    const reqEmail = signInCredntials.email;
    const reqPassword = signInCredntials.password;

    const isUserExisting = await this.userService.verifyEmail(reqEmail);

    if (!isUserExisting) {
      throw new UnauthorizedException('Email or password do not match');
    }

    const { password, ...otherDetails } = isUserExisting;

    const isPasswordMatched = await bcrypt.compareSync(reqPassword, password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Email or password do not match');
    }

    const user = {
      id: otherDetails.id,
      username: otherDetails.username,
      email: otherDetails.email,
      roles: otherDetails.roles
    };

    const access_token = await this.jwtService.signAsync(user);

    response.cookie('auth_token', access_token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 300),
      httpOnly: true,
      sameSite: 'lax'
    });

    return access_token;
  }
}
