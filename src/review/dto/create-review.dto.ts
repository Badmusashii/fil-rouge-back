import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';
import { Groupe } from 'src/groupe/entities/groupe.entity';

export class CreateReviewDto {
  @IsNotEmpty()
  review: string;

  @IsBoolean()
  vote?: boolean;

  groupes?: Groupe[];
}
