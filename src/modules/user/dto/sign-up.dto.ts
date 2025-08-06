import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class SignUpDto {
  @ApiProperty({ example: "John Doe", description: "User's full name" })
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "example@mail.com",
    description: "User's email address",
  })
  @Type(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123", description: "User's password" })
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;
}
