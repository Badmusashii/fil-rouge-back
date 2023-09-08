import { IsBoolean, IsInt, IsNotEmpty } from "class-validator";

export class CreateReviewDto {
@IsNotEmpty()
  review: string;

  @IsBoolean()
  vote: boolean;

  @IsInt()
  idMember: number;

  @IsInt()
  idRestaurant: number;

}
