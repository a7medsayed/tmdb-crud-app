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
import { FavoritelistService } from "../service/favorite-list.service";
import { Types } from "mongoose";

import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { GetFavoritelistQueryDto } from "../dto/get-favoritelist.dto";

@ApiTags("user favorite list")
@UseGuards(JwtAuthGuard)
@Controller("favoritelist")
@UseGuards(JwtAuthGuard)
export class FavoritelistController {
  constructor(private readonly favoritelistService: FavoritelistService) {}

  @ApiOperation({ summary: "Add Movie to Favorite List" })
  @ApiBody({ type: String, description: "Movie ID to add to favorite list" })
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
  @ApiOperation({ summary: "Get User Favorite List" })
  @ApiTags("list")
  @ApiOperation({ summary: "List User Favorite Movies" })
  @Get("list")
  async getFavoritelist(
    @Req() req: Request,
    @Query() query: GetFavoritelistQueryDto
  ) {
    const userId = req["user"].sub || req["user"]._id;
    return this.favoritelistService.getUserFavoritelist(
      userId,
      Number(query.page),
      Number(query.limit)
    );
  }
}
