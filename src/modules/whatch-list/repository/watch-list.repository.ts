import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  WATCHLIST_COLLECTION_NAME,
  WatchlistDocument,
} from "../schema/watch-list.schema";

@Injectable()
export class WatchlistRepository {
  constructor(
    @InjectModel(WATCHLIST_COLLECTION_NAME)
    private watchlistModel: Model<WatchlistDocument>
  ) {}

  async addToWatchlist(userId: Types.ObjectId, movieId: number) {
    return this.watchlistModel.updateOne(
      { user: userId, movie: movieId },
      { $set: { user: userId, movie: movieId } },
      { upsert: true }
    );
  }

  async getUserWatchlist(userId: Types.ObjectId) {
    return this.watchlistModel.find({ user: userId }).exec();
  }
}
