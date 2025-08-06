import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Movie } from "../../movie/schema/movie.schema";

export const FAVORITELIST_COLLECTION_NAME = "Favoritelist";

export type FavoritelistDocument = Favoritelist & Document;

@Schema({
  collection: FAVORITELIST_COLLECTION_NAME,
  timestamps: true,
})
export class Favoritelist {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, index: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Movie.name, required: true })
  movie: Types.ObjectId; // Reference to Movie _id
}

export const FavoritelistSchema = SchemaFactory.createForClass(Favoritelist);
FavoritelistSchema.index({ user: 1, movie: 1 }, { unique: true });
