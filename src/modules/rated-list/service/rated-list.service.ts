import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { RatedlistRepository } from "../repository/rated-list.repository";
import { MovieService } from "src/modules/movie/service/movie.service";

@Injectable()
export class RatedlistService {
  constructor(
    private readonly ratedlistRepository: RatedlistRepository,
    @Inject(forwardRef(() => MovieService))
    private readonly movieService: MovieService
  ) {}

  async addToRatedlist(
    userId: Types.ObjectId,
    movieId: Types.ObjectId,
    rate: number
  ) {
    await this.ratedlistRepository.addToRatedlist(userId, movieId, rate);
    return { success: true };
  }

  async getUserRatedlist(userId: Types.ObjectId, page = 1, limit = 10) {
    const ratedlist = await this.ratedlistRepository.getUserRatedlist(userId);
    const movieIds = ratedlist.map((item) => item.movie);
    return this.movieService.findByObjectIds(movieIds, page, limit);
  }

  async getMovieAverageRate(movieId: Types.ObjectId): Promise<number> {
    const result = await this.ratedlistRepository.getMovieAverageRate(movieId);
    return result?.averageRate ?? 0;
  }
}
