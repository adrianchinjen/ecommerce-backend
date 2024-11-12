import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService]
})
export class AuthModule {}
