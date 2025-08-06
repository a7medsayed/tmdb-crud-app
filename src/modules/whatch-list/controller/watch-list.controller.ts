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
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { GetWatchlistQueryDto } from "../dto/get-watchlist.dto";

@ApiTags("user watch list")
@Controller("watchlist")
@UseGuards(JwtAuthGuard)
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiOperation({ summary: "Add Movie to Watchlist" })
  @ApiTags("add")
  @ApiOperation({ summary: "Add Movie to Watchlist" })
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
  @ApiOperation({ summary: "List User Watchlist" })
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
