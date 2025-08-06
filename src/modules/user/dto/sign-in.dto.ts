import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({ example: "example@mail.com", description: "User email" })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: "password123", description: "User password" })
  @IsString()
  password: string;
}
