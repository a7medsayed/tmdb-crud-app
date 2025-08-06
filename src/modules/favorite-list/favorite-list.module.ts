import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Movie, MovieSchema } from "../movie/schema/movie.schema";
import {
  FAVORITELIST_COLLECTION_NAME,
  FavoritelistSchema,
} from "./schema/favorite-list.schema";
import { FavoritelistController } from "./controller/favorite-list.controller";
import { FavoritelistService } from "./service/favorite-list.service";
import { FavoritelistRepository } from "./repository/favorite-list.repository";
import { MoviesModule } from "../movie/movie.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FAVORITELIST_COLLECTION_NAME, schema: FavoritelistSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
    MoviesModule,
    UserModule,
  ],
  controllers: [FavoritelistController],
  providers: [FavoritelistRepository, FavoritelistService],
  exports: [FavoritelistService],
})
export class FavoritelistModule {}
