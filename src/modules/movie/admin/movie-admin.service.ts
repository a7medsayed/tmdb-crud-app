import { Injectable } from "@nestjs/common";
import { TmdbService } from "../../third-party-integrations/tmdb-movies/service/tmdb.service";
import { MovieService } from "../service/movie.service";

@Injectable()
export class AdminService {
  constructor(
    private readonly tmdbService: TmdbService,
    private readonly movieService: MovieService
  ) {}

  async syncMovies(): Promise<{ inserted: number; total: number }> {
    let inserted = 0;
    let total = 0;
    for (let page = 1; page <= 500; page++) {
      const tmdbResponse = await this.tmdbService.listMovies(page);
      const movies = tmdbResponse.results.map((m) => ({
        ...m,
      }));
      const count = await this.movieService.createManyIfNotExists(movies);
      inserted += count;
      total += movies.length;
    }
    return { inserted, total };
  }
}
