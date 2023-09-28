import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class AddVoteDto {
  @IsInt()
  @IsNotEmpty()
  restaurantId: number;

  @IsInt()
  @IsNotEmpty()
  groupeId: number;

  @IsBoolean()
  @IsNotEmpty()
  vote: boolean;
}
