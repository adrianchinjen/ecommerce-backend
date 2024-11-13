import { IsEmail, IsLowercase, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8, // Minimum length of the password
    minUppercase: 1, // Minimum number of uppercase letters
    minLowercase: 1, // Minimum number of lowercase letters
    minNumbers: 1, // Minimum number of digits
    minSymbols: 1 // Minimum number of symbols
  })
  password: string;
}