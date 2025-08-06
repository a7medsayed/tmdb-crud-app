import {
  IsOptional,
  IsString,
  IsNumber,
  IsIn,
  IsEnum,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";
import { MovieGenre } from "../enum/genre.enum";

/**
 * DTO for listing movies with optional filters and pagination.
 */
import { ApiProperty } from "@nestjs/swagger";

export class ListMoviesDto {
  @ApiProperty({
    description: "Search term for movie title or original title",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: "Filter by movie genres",
    required: false,
    type: [String],
    enum: MovieGenre,
  })
  @IsOptional()
  @IsString({ each: true })
  @IsEnum(MovieGenre, { each: true })
  @IsArray()
  genres?: string[];

  @ApiProperty({
    description: "Page number for pagination",
    required: false,
    type: Number,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiProperty({
    description: "Number of items per page",
    required: false,
    type: Number,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiProperty({
    description: "Field to sort by",
    required: false,
    type: String,
    default: "createdAt",
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    description: "Sort order, 1 for ascending and -1 for descending",
    required: false,
    type: Number,
    enum: [1, -1],
    default: -1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsIn([1, -1])
  sortOrder?: 1 | -1;
}
