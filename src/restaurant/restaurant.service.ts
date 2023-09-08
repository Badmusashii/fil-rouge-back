import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository} from 'typeorm';
import { Categorie } from 'src/categorie/entities/categorie.entity'
import { Member } from 'src/member/entities/member.entity';
@Injectable()
export class RestaurantService {

  constructor(
    @InjectRepository(Restaurant) private restaurantsRepository: Repository<Restaurant>, @InjectRepository(Categorie) private categorieRepository: Repository<Categorie>, @InjectRepository(Member) private memberRepository: Repository<Member>,
  ){}
  async create(createRestaurantDto: CreateRestaurantDto, member:Member) {
    
    const newRestaurant = this.restaurantsRepository.create({
      ...createRestaurantDto, member,
    });
    
    return await this.restaurantsRepository.save(newRestaurant);
  }

  findAll() {
    return `This action returns all restaurant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  async remove(id: number) {

    const found = await this.restaurantsRepository.findOneBy({id});
    console.log(found);

    if(!found){
      throw new NotFoundException(`Le restaurant n'existe pas`);
    }
    await this.restaurantsRepository.remove(found);
  
    return `Le restaurant ${found.name} a bien été supprimé`;
  }
}
