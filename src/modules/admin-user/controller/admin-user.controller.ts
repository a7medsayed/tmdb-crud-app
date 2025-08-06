import { Controller, Post, Body } from "@nestjs/common";
import { AdminAuthService } from "../service/admin-user.service";

import { ApiTags, ApiOperation } from "@nestjs/swagger";
@ApiTags("admin-auth")
@Controller("admin/auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}
  @ApiOperation({ summary: "Admin User Login" })
  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    return this.adminAuthService.login(body.email, body.password);
  }
}
