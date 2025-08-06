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
import { WatchlistService } from "../service/watch-list.service";
import { Types } from "mongoose";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { GetWatchlistQueryDto } from "../dto/get-watchlist.dto";

@ApiBearerAuth()
@ApiTags("user watch list")
@Controller("watchlist")
@UseGuards(JwtAuthGuard)
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiOperation({ summary: "Add Movie to Watchlist" })
  @ApiTags("add")
  @Post("add")
  async addToWatchlist(@Body("movieId") movieId: string, @Req() req: Request) {
    const userId = req["user"].sub || req["user"]._id;
    return this.watchlistService.addToWatchlist(
      userId,
      new Types.ObjectId(movieId)
    );
  }

  @ApiOperation({ summary: "Get User Watchlist" })
  @ApiTags("list")
  @Get("list")
  async getWatchlist(
    @Req() req: Request,
    @Query() query: GetWatchlistQueryDto
  ) {
    const userId = req["user"].sub || req["user"]._id;
    return this.watchlistService.getUserWatchlist(
      userId,
      Number(query.page),
      Number(query.limit)
    );
  }
}
