import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Movie, MovieSchema } from "../movie/schema/movie.schema";
import {
  WATCHLIST_COLLECTION_NAME,
  WatchlistSchema,
} from "./schema/watch-list.schema";
import { WatchlistController } from "./controller/watch-list.controller";
import { WatchlistService } from "./service/watch-list.service";
import { WatchlistRepository } from "./repository/watch-list.repository";
import { MoviesModule } from "../movie/movie.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WATCHLIST_COLLECTION_NAME, schema: WatchlistSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
    MoviesModule,
    UserModule,
  ],
  controllers: [WatchlistController],
  providers: [WatchlistRepository, WatchlistService],
  exports: [WatchlistService],
})
export class WatchlistModule {}
