import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvironmentVariables } from "../env/env.configuration";
import { AppController } from "./app.controller";
import { TmdbIntegrationModule } from "./modules/third-party-integrations/tmdb-movies/tmdb-integration.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/user/auth/auth.module";
import { MoviesModule } from "./modules/movie/movie.module";
import { FavoritelistModule } from "./modules/favorite-list/favorite-list.module";
import { WatchlistModule } from "./modules/whatch-list/watch-list.module";
import { RatedlistModule } from "./modules/rated-list/rated-list.module";
import { AdminUserModule } from "./modules/admin-user/admin-user.module";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-ioredis";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [EnvironmentVariables],
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 6000, // Cache time-to-live in seconds
      store: redisStore,
      host: EnvironmentVariables().redis.host || "redis",
      port: EnvironmentVariables().redis.port || 6379,
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
    MoviesModule,
    FavoritelistModule,
    WatchlistModule,
    RatedlistModule,
    AdminUserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
