import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Movie,
  MovieSchema,
  MOVIE_COLLECTION_NAME,
} from "./schema/movie.schema";
import { MovieRepository } from "./repository/movie.repository";
import { MovieService } from "./service/movie.service";
import { TmdbIntegrationModule } from "../third-party-integrations/tmdb-movies/tmdb-integration.module";
import { AdminController } from "./admin/movie-admin.controller";
import { AdminService } from "./admin/movie-admin.service";
import { MovieController } from "./controller/movie.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
        collection: MOVIE_COLLECTION_NAME,
      },
    ]),
    TmdbIntegrationModule,
  ],
  controllers: [AdminController, MovieController],
  providers: [MovieRepository, MovieService, AdminService],
  exports: [MovieService],
})
export class MoviesModule {}
