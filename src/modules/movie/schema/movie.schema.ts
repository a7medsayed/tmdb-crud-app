import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export const MOVIE_COLLECTION_NAME = "Movie";

export type MovieDocument = Movie & Document;

@Schema({
  collection: MOVIE_COLLECTION_NAME,
  autoIndex: true,
  timestamps: true,
})
export class Movie {
  _id?: Types.ObjectId;

  @Prop({ type: Boolean, required: true })
  adult: boolean;

  @Prop({ type: String, default: null })
  backdrop_path: string | null;

  @Prop({ type: [Number], required: true })
  genre_ids: number[];

  @Prop({ type: Number, required: true, unique: true, index: true })
  id: number;

  @Prop({ type: String, required: true })
  original_language: string;

  @Prop({ type: String, required: true })
  original_title: string;

  @Prop({ type: String, required: true })
  overview: string;

  @Prop({ type: Number, required: true })
  popularity: number;

  @Prop({ type: String, required: true })
  poster_path: string;

  @Prop({ type: String, required: true })
  release_date: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Boolean, required: true })
  video: boolean;

  @Prop({ type: Number, required: true })
  vote_average: number;

  @Prop({ type: Number, required: true })
  vote_count: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
MovieSchema.index({ id: 1 }, { unique: true });
