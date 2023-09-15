import { Injectable } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorie } from './entities/categorie.entity';
import { Repository} from 'typeorm';


@Injectable()
export class CategorieService {

  constructor(
    @InjectRepository(Categorie) private categoriesRepository: Repository<Categorie>,){} 

  create(createCategorieDto: CreateCategorieDto) {
    return 'This action adds a new categorie';
  }

   async findAll() {

    return await this.categoriesRepository.find();
  }

  async findOne(id: number) {

    
    return `This action returns a #${id} categorie`;
  }

  update(id: number, updateCategorieDto: UpdateCategorieDto) {
    return `This action updates a #${id} categorie`;
  }

  remove(id: number) {
    return `This action removes a #${id} categorie`;
  }
}
