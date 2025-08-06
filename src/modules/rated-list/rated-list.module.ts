import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Movie, MovieSchema } from "../movie/schema/movie.schema";
import {
  RATEDLIST_COLLECTION_NAME,
  RatedlistSchema,
} from "./schema/rated-list.schema";
import { RatedlistController } from "./controller/rated-list.controller";
import { RatedlistService } from "./service/rated-list.service";
import { RatedlistRepository } from "./repository/rated-list.repository";
import { MoviesModule } from "../movie/movie.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RATEDLIST_COLLECTION_NAME, schema: RatedlistSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
    forwardRef(() => MoviesModule),
    UserModule,
  ],
  controllers: [RatedlistController],
  providers: [RatedlistRepository, RatedlistService],
  exports: [RatedlistService],
})
export class RatedlistModule {}
