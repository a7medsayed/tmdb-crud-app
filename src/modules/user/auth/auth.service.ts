import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../service/user.service";
import { User } from "../schema/user.schema";
import * as bcrypt from "bcrypt";
import { SignUpDto } from "../dto/sign-up.dto";
import { SignInDto } from "../dto/sign-in.dto";
import { ErrorCodes } from "src/constants/error-codes";
import { EnvironmentVariables } from "env/env.configuration";
import { ValidationError } from "webpack";
import { ValidationErrorCodes } from "src/constants/validation-error-codes";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(
    payload: SignUpDto
  ): Promise<{ user: User; accessToken: string }> {
    const user = await this.userService.findOne(payload.email);
    if (user) {
      throw new BadRequestException(ValidationErrorCodes.emailIsExists);
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const createdUser = await this.userService.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    });

    delete createdUser.password; // Remove password from the response
    const userPayload = { email: createdUser.email, sub: createdUser._id };

    const accessToken = this.jwtService.sign(userPayload, {
      expiresIn: EnvironmentVariables().jwt.expiresIn,
      secret: EnvironmentVariables().jwt.secret,
    });
    return { accessToken, user: createdUser };
  }

  async signIn(payload: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(payload.email);
    if (user && (await bcrypt.compare(payload.password, user.password))) {
      const userPayload = { email: user.email, sub: user._id };
      return {
        accessToken: this.jwtService.sign(userPayload, {
          expiresIn: EnvironmentVariables().jwt.expiresIn,
          secret: EnvironmentVariables().jwt.secret,
        }),
      };
    }
    throw new BadRequestException(ValidationErrorCodes.INVALID_CREDENTIALS);
  }
}
