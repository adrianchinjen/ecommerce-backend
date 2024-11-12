import { Injectable } from '@nestjs/common';
import { user_role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

export interface AuthDetails {
  id: number;
  username: string;
  email: string;
  password: string;
  role: user_role;
  // created_at: string;
  // updated_at: string;
}

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async checkUserEmail(email: string) {
    // let userExist = false;
    const isEmailExisting: AuthDetails = await this.databaseService.auth.findUnique({
      where: { email }
    });

    return isEmailExisting;
  }
}
