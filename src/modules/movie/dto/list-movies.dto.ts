import { IsOptional, IsString, IsNumber, IsIn, IsEnum, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { MovieGenre } from "../enum/genre.enum";

export class ListMoviesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString({ each: true })
  @IsEnum(MovieGenre, { each: true })
  @IsArray()
  genres?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, -1])
  sortOrder?: 1 | -1;
}
