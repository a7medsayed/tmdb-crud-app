import { Injectable } from "@nestjs/common";
import { MovieRepository } from "../repository/movie.repository";
import { Movie } from "../schema/movie.schema";
import { ListMoviesDto } from "../dto/list-movies.dto";
import { MovieGenre } from "../enum/genre.enum";
import { Types } from "mongoose";

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async createManyIfNotExists(movies: Partial<Movie>[]): Promise<number> {
    const ids = movies.map((m) => m.id);
    const existing = await this.movieRepository.findByIds(ids);
    const existingIds = new Set(existing.map((m) => m.id));
    const newMovies = movies.filter((m) => !existingIds.has(m.id));
    if (newMovies.length) {
      await this.movieRepository.createMany(newMovies);
    }
    return newMovies.length;
  }

  async listMovies(query: ListMoviesDto): Promise<{
    docs: Movie[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const _query: any = {};
    _query["$and"] = [];

    // Search by title or original_title
    const _search = (query.search || "").trim();
    if (_search) {
      _query["$and"].push({
        $or: [
          {
            title: {
              $regex: new RegExp(
                _search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
                "i"
              ),
            },
          },
          {
            original_title: {
              $regex: new RegExp(
                _search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
                "i"
              ),
            },
          },
        ],
      });
    }

    // Filter by genres (accepts genre names or IDs)
    if (query.genres && query.genres.length > 0) {
      // Accepts: "Action", "Thriller", "28", "53", or comma-separated
      const genreIds = query.genres
        .map((g) => {
          return MovieGenre[g];
        })
        .filter((id) => typeof id === "number");
      if (genreIds.length > 0) {
        _query["$and"].push({
          genre_ids: { $in: genreIds },
        });
      }
    }

    // Remove $and if empty (to avoid unnecessary empty $and)
    if (_query["$and"].length === 0) {
      delete _query["$and"];
    }

    // Sort
    const sort: any = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder || -1;
    } else {
      sort["createdAt"] = -1;
    }

    return this.movieRepository.findWithPagination(_query, {
      page: query.page,
      limit: query.limit,
      sort,
    });
  }

  async findByObjectIds(
    ids: Types.ObjectId[],
    page = 1,
    limit = 10
  ): Promise<{
    docs: Movie[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    return this.movieRepository.findByObjectIdsPaginated(ids, page, limit);
  }
}
