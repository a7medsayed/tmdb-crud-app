import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { WatchlistRepository } from "../repository/watch-list.repository";
import { MovieService } from "src/modules/movie/service/movie.service";

@Injectable()
export class WatchlistService {
  constructor(
    private readonly watchlistRepository: WatchlistRepository,
    private readonly movieService: MovieService
  ) {}

  async addToWatchlist(userId: Types.ObjectId, movieId: number) {
    await this.watchlistRepository.addToWatchlist(userId, movieId);
    return { success: true };
  }

  async getUserWatchlist(userId: Types.ObjectId, page = 1, limit = 10) {
    const watchlist = await this.watchlistRepository.getUserWatchlist(userId);
    const movieIds = watchlist.map((item) => item.movie);
    return this.movieService.findByObjectIds(movieIds, page, limit);
  }
}
