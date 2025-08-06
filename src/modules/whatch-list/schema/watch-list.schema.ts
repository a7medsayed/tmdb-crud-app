import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Movie } from "../../movie/schema/movie.schema";

export const WATCHLIST_COLLECTION_NAME = "Watchlist";

export type WatchlistDocument = Watchlist & Document;

@Schema({
  collection: WATCHLIST_COLLECTION_NAME,
  timestamps: true,
})
export class Watchlist {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, index: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Movie.name, required: true })
  movie: Types.ObjectId; // Reference to Movie _id
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);
WatchlistSchema.index({ user: 1, movie: 1 }, { unique: true });
