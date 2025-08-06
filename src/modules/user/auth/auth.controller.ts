import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "../dto/sign-up.dto";
import { SignInDto } from "../dto/sign-in.dto";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";

@ApiTags("user auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "User Sign Up" })
  @ApiBody({ type: SignUpDto })
  @Post("signup")
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  @ApiOperation({ summary: "User Sign In" })
  @ApiBody({ type: SignInDto })
  @Post("signin")
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
