import { Controller, Post, Get, Body, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../user/auth/jwt-auth.guard";
import { Request } from "express";
import { WatchlistService } from "../service/watch-list.service";

@Controller("watchlist")
@UseGuards(JwtAuthGuard)
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post("add")
  async addToWatchlist(@Body("movieId") movieId: number, @Req() req: Request) {
    const userId = req["user"].sub || req["user"]._id;
    return this.watchlistService.addToWatchlist(userId, movieId);
  }

  @Get("list")
  async getWatchlist(@Req() req: Request) {
    const userId = req["user"].sub || req["user"]._id;
    return this.watchlistService.getUserWatchlist(userId);
  }
}
