import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminUserRepository } from "../repository/admin-user.repository";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, "admin-jwt") {
  constructor(private readonly adminUserRepository: AdminUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    // Optionally check for role === 'admin'
    if (payload.role !== "admin") {
      throw new UnauthorizedException("Not an admin");
    }
    const admin = await this.adminUserRepository.findByEmail(payload.email);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
