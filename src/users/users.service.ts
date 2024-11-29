import { ConflictException, Injectable } from '@nestjs/common';
import { user_role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

export interface AuthDetails {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: user_role[];
  // created_at: string;
  // updated_at: string;
}

interface UserDetails {
  username: string;
  email: string;
  roles: user_role[];
  auth_id: number;
}

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async verifyEmail(email: string) {
    try {
      const userEmail: AuthDetails = await this.databaseService.auth.findUnique({
        where: { email }
      });

      if (userEmail) {
        return userEmail;
      }

      return userEmail;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async verifyUsername(username: string) {
    try {
      const userUsername: AuthDetails = await this.databaseService.auth.findUnique({
        where: { username }
      });

      if (userUsername) {
        return userUsername;
      }

      return userUsername;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async saveUser(userDetails: UserDetails) {
    const { username, email, roles, auth_id } = userDetails;

    const userData = {
      username,
      email,
      roles,
      auth_id
    };

    const saveUserData = await this.databaseService.users.create({
      data: userData
    });

    return saveUserData;
  }
}
