import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Movie } from "../../movie/schema/movie.schema";

export const RATEDLIST_COLLECTION_NAME = "Ratedlist";

export type RatedlistDocument = Ratedlist & Document;

@Schema({
  collection: RATEDLIST_COLLECTION_NAME,
  timestamps: true,
})
export class Ratedlist {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, index: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Movie.name, required: true })
  movie: Types.ObjectId; // Reference to Movie _id

  @Prop({ type: Number, required: true, min: 1, max: 5 })
  rate: number; // User's rating from 1 to 5
}

export const RatedlistSchema = SchemaFactory.createForClass(Ratedlist);
RatedlistSchema.index({ user: 1, movie: 1 }, { unique: true });
