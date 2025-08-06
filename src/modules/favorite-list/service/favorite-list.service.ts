import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { FavoritelistRepository } from "../repository/favorite-list.repository";
import { MovieService } from "src/modules/movie/service/movie.service";

@Injectable()
export class FavoritelistService {
  constructor(
    private readonly favoritelistRepository: FavoritelistRepository,
    private readonly movieService: MovieService
  ) {}

  async addToFavoritelist(userId: Types.ObjectId, movieId: Types.ObjectId) {
    await this.favoritelistRepository.addToFavoritelist(userId, movieId);
    return { success: true };
  }

  async getUserFavoritelist(userId: Types.ObjectId, page = 1, limit = 10) {
    const favoritelist = await this.favoritelistRepository.getUserFavoritelist(
      userId
    );
    const movieIds = favoritelist.map((item) => item.movie);
    return this.movieService.findByObjectIds(movieIds, page, limit);
  }
}
