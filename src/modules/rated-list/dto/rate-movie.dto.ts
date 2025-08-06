import { IsMongoId, IsInt, Min, Max } from "class-validator";

export class RateMovieDto {
  @IsMongoId()
  movieId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;
}
