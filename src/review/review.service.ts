import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Groupe } from 'src/groupe/entities/groupe.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Restaurant)
    private readonly restaurantRespository: Repository<Restaurant>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    member: Member,
    idRestaurant: number,
  ) {
    console.log(member);
    const restaurant = await this.restaurantRespository.findOne({
      where: { id: idRestaurant },
    });
    if (!restaurant) {
      return {
        status: 'fail',
        message: `Le restaurant avec l'id ${idRestaurant} n'a pas été trouvé.`,
        data: null,
      };
    }
    const newReview = await this.reviewRepository.save({
      ...createReviewDto,
      member,
      restaurant,
    });

    // Effacement des données de notre utilisateur
    delete member.email;
    delete member.firstname;
    delete member.lastname;
    delete member.password;
    delete restaurant.member;
    // ____________________________________

    return {
      status: 'success',
      message: `La review pour le restaurant ${restaurant.name} a bien été creer pas ${member.username}.`,
      data: newReview,
    };
  }

  async findAllByRestaurantId(id: number) {
    const reviews = await this.reviewRepository.find({
      where: { restaurant: { id: id } },
    });
    console.log(reviews);
    if (reviews.length === 0) {
      return {
        status: 'success',
        message: `Aucune review n'a été trouvée pour le restaurant avec l'id ${id}.`,
        data: [],
      };
    }
    // Boucle for pour effacer les données de nos utilisateurs
    for (const review of reviews) {
      if (review.member) {
        delete review.member.email;
        delete review.member.firstname;
        delete review.member.lastname;
        delete review.member.password;
      }
      if (review.restaurant) {
        delete review.restaurant;
      }
    }
    // -------------------------------------------------------

    return {
      status: 'success',
      message: `Les reviews pour le restaurant avec l'id ${id} ont été trouvées.`,
      data: reviews,
    };
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: id },
      relations: ['member', 'restaurant'],
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    if (review.restaurant) {
      delete review.restaurant.member;
    }
    if (review.member) {
      delete review.member.lastname;
      delete review.member.firstname;
      delete review.member.email;
      delete review.member.password;
    }
    return {
      status: 'success',
      message: `La review avec l'id ${id} a été trouvée.`,
      data: review,
    };
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, member: Member) {
    const existingReview = await this.reviewRepository.findOne({
      where: { id: id },
    });

    if (!existingReview) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    // Vérification de l'autorisation
    if (existingReview.member.id !== member.id) {
      // Ou tout autre champ que tu utilises pour identifier le membre
      throw new ForbiddenException(
        "Vous n'avez pas le droit de modifier cette review",
      );
    }

    const updatedReview = await this.reviewRepository.save({
      ...existingReview,
      ...updateReviewDto,
    });
    delete updatedReview.member.lastname;
    delete updatedReview.member.firstname;
    delete updatedReview.member.email;
    delete updatedReview.member.password;
    delete updatedReview.restaurant.member.firstname;
    delete updatedReview.restaurant.member.lastname;
    delete updatedReview.restaurant.member.email;
    delete updatedReview.restaurant.member.password;
    return {
      status: 'success',
      message: `La review avec l'id ${id} a été mise à jour avec succès.`,
      data: updatedReview,
    };
  }

  async remove(id: number) {
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("Cette review n'existe pas !");
    }
    return {
      status: 'success',
      message: `La review avec l'id ${id} a été supprimée avec succès.`,
    };
  }
}