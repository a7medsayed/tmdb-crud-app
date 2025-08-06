import { Controller, Post, Get, Body, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../user/auth/jwt-auth.guard";
import { Request } from "express";
import { RatedlistService } from "../service/rated-list.service";
import { Types } from "mongoose";
import { RateMovieDto } from "../dto/rate-movie.dto";

@Controller("ratedlist")
@UseGuards(JwtAuthGuard)
export class RatedlistController {
  constructor(private readonly ratedlistService: RatedlistService) {}

  @Post("rate")
  async addToRatedlist(@Body() payload: RateMovieDto, @Req() req: Request) {
    const userId = req["user"].sub || req["user"]._id;
    return this.ratedlistService.addToRatedlist(
      userId,
      new Types.ObjectId(payload.movieId),
      payload.rate
    );
  }

  @Get("list")
  async getRatedlist(@Req() req: Request) {
    const userId = req["user"].sub || req["user"]._id;
    return this.ratedlistService.getUserRatedlist(userId);
  }
}
