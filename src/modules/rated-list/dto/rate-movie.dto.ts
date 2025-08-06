import { IsMongoId, IsInt, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for rating a movie.
 */
export class RateMovieDto {
  @ApiProperty({
    description: "ID of the movie to rate",
    type: String,
    required: true,
  })
  @IsMongoId()
  movieId: string;

  @ApiProperty({
    description: "Rating for the movie (1 to 5)",
    type: Number,
    required: true,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;
}
