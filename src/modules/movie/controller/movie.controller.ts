import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { MovieService } from "../service/movie.service";
import { ListMoviesDto } from "../dto/list-movies.dto";
import { JwtAuthGuard } from "src/modules/user/auth/jwt-auth.guard";

@Controller("movies")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(JwtAuthGuard) // Assuming you have a UserGuard for authentication
  @Get("list")
  async listMovies(@Query() query: ListMoviesDto) {
    return this.movieService.listMovies(query);
  }
}
