import { Categorie } from 'src/categorie/entities/categorie.entity';
import{Price} from 'src/types/enumPrice'

export class CreateRestaurantDto {
name: string;
adresse: string;
price: Price;
categorie: Categorie;
}
