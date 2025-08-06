import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { MovieService } from "../service/movie.service";
import { ListMoviesDto } from "../dto/list-movies.dto";
import { JwtAuthGuard } from "src/modules/user/auth/jwt-auth.guard";
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags("movies")
@UseGuards(JwtAuthGuard)
@Controller("movies")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiTags("list")
  @ApiOperation({ summary: "List Movies" })
  @Get("list")
  async listMovies(@Query() query: ListMoviesDto) {
    return this.movieService.listMovies(query);
  }
}
