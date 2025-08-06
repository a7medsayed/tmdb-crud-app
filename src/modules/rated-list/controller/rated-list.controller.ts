import { Controller, Post, Get, Body, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../user/auth/jwt-auth.guard";
import { Request } from "express";
import { RatedlistService } from "../service/rated-list.service";
import { Types } from "mongoose";
import { RateMovieDto } from "../dto/rate-movie.dto";

import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";

@ApiTags("user rated list")
@Controller("ratedlist")
@UseGuards(JwtAuthGuard)
export class RatedlistController {
  constructor(private readonly ratedlistService: RatedlistService) {}

  @ApiOperation({ summary: "Rate a Movie" })
  @ApiBody({ type: RateMovieDto })
  @UseGuards(JwtAuthGuard)
  @Post("rate")
  async addToRatedlist(@Body() payload: RateMovieDto, @Req() req: Request) {
    const userId = req["user"].sub || req["user"]._id;
    return this.ratedlistService.addToRatedlist(
      userId,
      new Types.ObjectId(payload.movieId),
      payload.rate
    );
  }

  @ApiOperation({ summary: "Get User Rated List" })
  @UseGuards(JwtAuthGuard)
  @Get("list")
  async getRatedlist(@Req() req: Request) {
    const userId = req["user"].sub || req["user"]._id;
    return this.ratedlistService.getUserRatedlist(userId);
  }
}
