import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  RATEDLIST_COLLECTION_NAME,
  RatedlistDocument,
} from "../schema/rated-list.schema";

@Injectable()
export class RatedlistRepository {
  constructor(
    @InjectModel(RATEDLIST_COLLECTION_NAME)
    private ratedlistModel: Model<RatedlistDocument>
  ) {}

  async addToRatedlist(userId: Types.ObjectId, movieId: Types.ObjectId, rate) {
    return this.ratedlistModel.updateOne(
      { user: userId, movie: movieId },
      { $set: { user: userId, movie: movieId, rate: rate } },
      { upsert: true }
    );
  }

  async getUserRatedlist(userId: Types.ObjectId) {
    return this.ratedlistModel.find({ user: userId }).exec();
  }

  async getMovieAverageRate(
    movieId: Types.ObjectId
  ): Promise<{ averageRate: number } | null> {
    const result = await this.ratedlistModel
      .aggregate([
        { $match: { movie: movieId } },
        {
          $group: {
            _id: "$movie",
            averageRate: { $avg: "$rate" },
          },
        },
        {
          $project: {
            _id: 0,
            averageRate: 1,
          },
        },
      ])
      .exec();
    return result[0] || null;
  }
}
