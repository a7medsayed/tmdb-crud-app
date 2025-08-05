import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user.module";
import { JwtModule } from "@nestjs/jwt";
import { EnvironmentVariables } from "env/env.configuration";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: EnvironmentVariables().jwt.secret,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
