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
    private restaurantRespository: Repository<Restaurant>,
    @InjectRepository(Groupe) private groupeRepository: Repository<Groupe>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    member: any,
    idRestaurant: number,
  ): Promise<Review> {
    // Récupération des autres entités par ID
    const restaurant = await this.restaurantRespository.findOne({
      where: { id: idRestaurant },
    });
    const groupe = await this.groupeRepository.findOne({
      where: { id: createReviewDto.idgroupe },
    });

    if (!restaurant || !groupe) {
      throw new NotFoundException(
        "Une des entités associées n'a pas été trouvée",
      );
    }

    const existingReview = await this.reviewRepository.findOne({
      where: {
        member: { id: member.id },
        restaurant: { id: idRestaurant },
        groupe: { id: createReviewDto.idgroupe },
      },
    });

    if (existingReview) {
      existingReview.review = createReviewDto.review;
      existingReview.vote = createReviewDto.vote;
      return await this.reviewRepository.save(existingReview);
    } else {
      const newReview = new Review();
      newReview.review = createReviewDto.review;
      newReview.vote = createReviewDto.vote;
      newReview.member = member.id;
      newReview.restaurant = restaurant;
      newReview.groupe = groupe;

      console.log('Value of newReview.vote: ', newReview.vote);

      return await this.reviewRepository.save(newReview);
    }
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
