import { Price } from 'src/types/enumPrice';

export class CreateRestaurantDto {
  name: string;
  adresse: string;
  price: Price;
  categorieId: number;
}
