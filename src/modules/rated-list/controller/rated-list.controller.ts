import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../user/auth/jwt-auth.guard";
import { Request } from "express";
import { RatedlistService } from "../service/rated-list.service";
import { Types } from "mongoose";
import { RateMovieDto } from "../dto/rate-movie.dto";

import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { GetRatedlistQueryDto } from "../dto/get-ratedList.dto";

@ApiBearerAuth()
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
  @ApiTags("list")
  @Get("list")
  async getRatedlist(
    @Req() req: Request,
    @Query() query: GetRatedlistQueryDto
  ) {
    const userId = req["user"].sub || req["user"]._id;
    return this.ratedlistService.getUserRatedlist(
      userId,
      Number(query.page),
      Number(query.limit)
    );
  }
}
