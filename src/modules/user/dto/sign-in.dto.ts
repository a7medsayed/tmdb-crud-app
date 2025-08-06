import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({ example: "ahmedsayed@gmail.com", description: "User email" })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: "12345", description: "User password" })
  @IsString()
  password: string;
}
