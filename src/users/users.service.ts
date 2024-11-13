import { Injectable } from '@nestjs/common';
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

  async checkUserEmail(email: string) {
    let userExist = false;
    const userEmail: AuthDetails = await this.databaseService.auth.findUnique({
      where: { email }
    });

    const isUserExisting = userEmail ? (userExist = true) : userExist;

    return isUserExisting;
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
