import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AdminUserRepository } from "../repository/admin-user.repository";
import { EnvironmentVariables } from "env/env.configuration";

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminUserRepository: AdminUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async validateAdmin(email: string, password: string) {
    const admin = await this.adminUserRepository.findByEmail(email);
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return admin;
  }

  async login(email: string, password: string) {
    const admin = await this.validateAdmin(email, password);
    const payload = { sub: admin._id, email: admin.email, role: "admin" };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: EnvironmentVariables().jwt.expiresIn,
        secret: EnvironmentVariables().jwt.secret,
      }),
    };
  }

  async findOne(email: string) {
    return this.adminUserRepository.findByEmail(email);
  }
}
