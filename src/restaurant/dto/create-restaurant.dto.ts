import { IsArray, IsObject } from 'class-validator';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Price } from 'src/types/enumPrice';

export class CreateRestaurantDto {
  [x: string]: any;
  name: string;
  adresse: string;
  price: Price;
  categorie: Categorie;
  reviews?: CreateReviewDto[];
}
