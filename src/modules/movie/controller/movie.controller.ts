import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { MovieService } from "../service/movie.service";
import { ListMoviesDto } from "../dto/list-movies.dto";
import { JwtAuthGuard } from "src/modules/user/auth/jwt-auth.guard";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("movies")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: "List Movies" })
  @Get("list")
  async listMovies(@Query() query: ListMoviesDto) {
    return this.movieService.listMovies(query);
  }
}
