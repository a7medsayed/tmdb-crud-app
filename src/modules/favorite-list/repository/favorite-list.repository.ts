import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  FAVORITELIST_COLLECTION_NAME,
  FavoritelistDocument,
} from "../schema/favorite-list.schema";

@Injectable()
export class FavoritelistRepository {
  constructor(
    @InjectModel(FAVORITELIST_COLLECTION_NAME)
    private favoritelistModel: Model<FavoritelistDocument>
  ) {}

  async addToFavoritelist(userId: Types.ObjectId, movieId: Types.ObjectId) {
    return this.favoritelistModel.updateOne(
      { user: userId, movie: movieId },
      { $set: { user: userId, movie: movieId } },
      { upsert: true }
    );
  }

  async getUserFavoritelist(userId: Types.ObjectId) {
    return this.favoritelistModel.find({ user: userId }).exec();
  }
}
