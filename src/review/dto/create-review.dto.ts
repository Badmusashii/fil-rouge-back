import { IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  review: string;

  @IsBoolean()
  vote: boolean;

  @IsInt()
  idgroupe: number;
}
