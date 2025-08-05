import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvironmentVariables } from "../env/env.configuration";
import { AppController } from "./app.controller";
import { TmdbIntegrationModule } from "./modules/third-party-integrations/tmdb-movies/tmdb-integration.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/user/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [EnvironmentVariables],
    }),
    MongooseModule.forRoot(EnvironmentVariables().mongodb.connectionUrl, {
      connectionFactory: (nativeMongooseConnection) => {
        nativeMongooseConnection.plugin(require("mongoose-paginate-v2"));
        nativeMongooseConnection.plugin(
          require("mongoose-aggregate-paginate-v2")
        );
        return nativeMongooseConnection;
      },
    }),
    TmdbIntegrationModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
