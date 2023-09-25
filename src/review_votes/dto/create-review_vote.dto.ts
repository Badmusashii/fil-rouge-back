import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewVoteDto {
  @IsNotEmpty()
  @IsNumber()
  idReview: number;

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
