import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Member } from 'src/member/entities/member.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    
  ) {}
  async create(createRestaurantDto: CreateRestaurantDto, member: Member) {
    const newRestaurant = this.restaurantsRepository.create({
      ...createRestaurantDto,
      member, 
    });

    return await this.restaurantsRepository.save(newRestaurant);
  }

  async findAll() {
    // relations: est ajouter pour recuperer les infos des entité de jointure
    const allRestaurants = await this.restaurantsRepository.find();

    // Supprimer les informations sensibles sur l'utilisateur
    allRestaurants.forEach((restaurant) => {
      delete restaurant.member.lastname;
      delete restaurant.member.firstname;
      delete restaurant.member.email;
      delete restaurant.member.password;
    });
    // -----------------------------------------------------

    return {
      status: 'success',
      message: 'Le retour de tous les restaurants se trouve dans la Data',
      data: allRestaurants,
    };
  }

  async findOne(id: number) {
    const restaurant = await this.restaurantsRepository.findOne({
      where: { id: id },
    });
    // Suppression des infos sensibles sur l'utilisateur
    delete restaurant.member.lastname;
    delete restaurant.member.firstname;
    delete restaurant.member.email;
    delete restaurant.member.password;

    return {
      status: 'success',
      message: `Le restaurant ${restaurant.name} correspondant à l'ID ${restaurant.id} se trouve dans la Data`,
      data: restaurant,
    };
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    // relations: est ajouter pour recuperer les infos des entité de jointure
    const restaurant = await this.restaurantsRepository.findOne({
      where: { id: id },
      relations: ['member', 'categorie'],
    });

    // Cas ou le restaurant est introuvable dans la BDD
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }

    // Suppression des infos sensible sur l'utilisateur
    delete restaurant.member.lastname;
    delete restaurant.member.firstname;
    delete restaurant.member.email;
    delete restaurant.member.password;
    // ------------------------------------------------

    // Mettre à jour les champs du restaurant avec les valeurs fournies dans updateRestaurantDto
    Object.assign(restaurant, updateRestaurantDto);

    // Constante pour le nouveau restaurant creé
    const updatedRestaurant = await this.restaurantsRepository.save(restaurant);

    return {
      status: 'success',
      message: `Le restaurant ${updatedRestaurant.name} a été bien modifié`,
      data: updatedRestaurant,
    };
  }

  async remove(id: number) {
    const found = await this.restaurantsRepository.findOneBy({ id });
    console.log(found);

    if (!found) {
      throw new NotFoundException(`Le restaurant n'existe pas`);
    }
    await this.restaurantsRepository.remove(found);

    return `Le restaurant ${found.name} a bien été supprimé`;
  }
}
