import { IsOptional, IsNumberString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetRatedlistQueryDto {
  @ApiPropertyOptional({ description: "Page number", example: "1" })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: "Items per page", example: "10" })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
