import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { AdminUser, AdminUserSchema } from "./schema/admin-user.schema";
import { AdminAuthController } from "./controller/admin-user.controller";
import { AdminAuthService } from "./service/admin-user.service";
import { AdminUserRepository } from "./repository/admin-user.repository";
import { AdminJwtStrategy } from "./auth/jwt-admin.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AdminUser.name, schema: AdminUserSchema }]),
   PassportModule,
    JwtModule.register({
      secret: "your_jwt_secret", // Use env variable in production!
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminUserRepository, AdminAuthService, AdminJwtStrategy],
  exports: [AdminAuthService, AdminJwtStrategy],
})
export class AdminUserModule {}