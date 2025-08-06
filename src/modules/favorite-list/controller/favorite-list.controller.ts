import { Controller, Post, Get, Body, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../user/auth/jwt-auth.guard";
import { Request } from "express";
import { FavoritelistService } from "../service/favorite-list.service";
import { Types } from "mongoose";

@Controller("favoritelist")
@UseGuards(JwtAuthGuard)
export class FavoritelistController {
  constructor(private readonly favoritelistService: FavoritelistService) {}

  @Post("add")
  async addToFavoritelist(
    @Body("movieId") movieId: Types.ObjectId,
    @Req() req: Request
  ) {
    const userId = req["user"].sub || req["user"]._id;
    return this.favoritelistService.addToFavoritelist(
      userId,
      new Types.ObjectId(movieId)
    );
  }

  @Get("list")
  async getFavoritelist(@Req() req: Request) {
    const userId = req["user"].sub || req["user"]._id;
    return this.favoritelistService.getUserFavoritelist(userId);
  }
}
