import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewVoteDto {
  // @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  idReview?: number;

  @IsNotEmpty()
  @IsNumber()
  idRestaurant: number;

  @IsNotEmpty()
  @IsBoolean()
  thumbs_up: boolean;

  @IsNotEmpty()
  @IsBoolean()
  thumbs_down: boolean;
}
