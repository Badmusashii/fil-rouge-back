import {
  ConflictException,
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
import { GroupeService } from 'src/groupe/groupe.service';

@Injectable()
export class ReviewService {
  constructor(
    private groupeService: GroupeService,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Restaurant)
    private restaurantRespository: Repository<Restaurant>,
    @InjectRepository(Groupe) private groupeRepository: Repository<Groupe>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  // async create(
  //   createReviewDto: CreateReviewDto,
  //   member: any,
  //   idRestaurant: number,
  // ): Promise<Review> {
  //   // Récupération des autres entités par ID
  //   const restaurant = await this.restaurantRespository.findOne({
  //     where: { id: idRestaurant },
  //   });
  //   const groupe = await this.groupeRepository.findOne({
  //     where: { id: createReviewDto.idgroupe },
  //   });

  //   if (!restaurant || !groupe) {
  //     throw new NotFoundException(
  //       "Une des entités associées n'a pas été trouvée",
  //     );
  //   }

  //   const existingReview = await this.reviewRepository.findOne({
  //     where: {
  //       member: { id: member.id },
  //       restaurant: { id: idRestaurant },
  //       groupe: { id: createReviewDto.idgroupe },
  //     },
  //   });

  //   if (existingReview) {
  //     existingReview.review = createReviewDto.review;
  //     existingReview.vote = createReviewDto.vote;
  //     return await this.reviewRepository.save(existingReview);
  //   } else {
  //     const newReview = new Review();
  //     newReview.review = createReviewDto.review;
  //     newReview.vote = createReviewDto.vote;
  //     newReview.member = member.id;
  //     newReview.restaurant = restaurant;
  //     newReview.groupe = groupe;

  //     console.log('Value of newReview.vote: ', newReview.vote);

  //     return await this.reviewRepository.save(newReview);
  //   }
  // }

  async create(
    createReviewDto: CreateReviewDto,
    member: any,
    idRestaurant: number,
  ): Promise<any> {
    // Recherche le restaurant associé à l'ID donné
    const restaurant = await this.restaurantRespository.findOne({
      where: { id: idRestaurant },
    });
    // Recherche le groupe associé à l'ID donné dans createReviewDto.
    const groupe = await this.groupeRepository.findOne({
      where: { id: createReviewDto.idgroupe },
    });
    // Vérifie si le restaurant ou le groupe n'existe pas.
    if (!restaurant || !groupe) {
      throw new NotFoundException(
        "Une des entités associées n'a pas été trouvée",
      );
    }
    // Recherche une review existante du membre pour le restaurant et le groupe donnés.
    const existingReview = await this.reviewRepository.findOne({
      where: {
        member: { id: member.id },
        restaurant: { id: idRestaurant },
        groupe: { id: createReviewDto.idgroupe },
      },
    });
    // Si une review existe déjà.
    if (existingReview) {
      // Vérifie si le vote est identique au vote précédent pour éviter le spam de "pouce haut" ou "pouce bas".
      if (existingReview.vote === createReviewDto.vote) {
        return {
          status: 'error',
          message:
            'Vote déjà enregistré, impossible de voter deux fois de la même manière.',
        };
      }
      // Met à jour la review existante.
      existingReview.review = createReviewDto.review;
      existingReview.vote = createReviewDto.vote;
      // Sauvegarde la review mise à jour.
      const updatedReview = await this.reviewRepository.save(existingReview);

      return {
        status: 'success',
        message: 'Votre review a été mise à jour avec succès.',
        data: updatedReview,
      };
    } else {
      // Crée une nouvelle review.
      const newReview = new Review();
      newReview.review = createReviewDto.review;
      newReview.vote = createReviewDto.vote;
      newReview.member = member.id;
      newReview.restaurant = restaurant;
      newReview.groupe = groupe;
      // Sauvegarde la nouvelle review.
      const createdReview = await this.reviewRepository.save(newReview);

      return {
        status: 'success',
        message: 'Votre nouvelle review a été créée avec succès.',
        data: createdReview,
      };
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
      relations: ['member'],
    });
    console.log('existingReview:', existingReview);

    const user = await this.memberRepository.findOne({
      where: { id: member.id },
    });
    console.log('mon menbre dans le serivice ' + member);
    if (!existingReview) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    // Vérification de l'autorisation
    console.log('existingReview.member.id:', existingReview.member.id);
    console.log('member.id:', member.id);
    console.log(existingReview.member.id);
    console.log('la valeur a probmleme' + JSON.stringify(member.id));
    if (existingReview.member.id !== user.id) {
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

    return {
      status: 'success',
      message: `La review avec l'id ${id} a été mise à jour avec succès.`,
      data: updatedReview,
    };
  }

  async countVotesByRestaurant(
    restaurantId: number,
  ): Promise<{ thumbsUp: number; thumbsDown: number }> {
    const thumbsUpCount = await this.reviewRepository.count({
      where: {
        restaurant: { id: restaurantId },
        vote: true,
      },
    });

    const thumbsDownCount = await this.reviewRepository.count({
      where: {
        restaurant: { id: restaurantId },
        vote: false,
      },
    });

    return { thumbsUp: thumbsUpCount, thumbsDown: thumbsDownCount };
  }

  async addVote(
    memberId: number,
    restaurantId: number,
    groupeId: number,
    vote: boolean,
  ): Promise<Review> {
    const member = await this.memberRepository.findOne({
      where: { id: memberId },
    });
    const restaurant = await this.restaurantRespository.findOne({
      where: { id: restaurantId },
    });
    const groupe = await this.groupeRepository.findOne({
      where: { id: groupeId },
    });

    if (!member || !restaurant || !groupe) {
      throw new NotFoundException('Membre, Restaurant ou Groupe non trouvé.');
    }

    const existingReview = await this.reviewRepository.findOne({
      where: {
        member: { id: memberId },
        restaurant: { id: restaurantId },
        groupe: { id: groupeId },
      },
    });

    if (existingReview) {
      if (existingReview.vote === vote) {
        throw new ConflictException(
          'Vote déjà enregistré, impossible de voter deux fois de la même manière.',
        );
      }
      existingReview.vote = vote;
      return await this.reviewRepository.save(existingReview);
    } else {
      const newReview = new Review();
      newReview.member = member;
      newReview.restaurant = restaurant;
      newReview.groupe = groupe;
      newReview.vote = vote;
      newReview.review = null;

      delete newReview.member.email;
      delete newReview.member.lastname;
      delete newReview.member.firstname;
      delete newReview.member.password;

      return await this.reviewRepository.save(newReview);
    }
  }

  async findRestaurantsByMemberGroups(memberId: number) {
    console.log('coté service ' + memberId);
    if (isNaN(memberId)) {
      throw new Error('MemberId est invalide');
    }
    // Obtenir tous les groupes pour ce membre
    const groups = await this.groupeService.findAllGroupeForUser(memberId);
    const restaurantsByGroup = {};

    // Parcourir chaque groupe pour trouver les restaurants associés
    for (const group of groups) {
      const reviews = await this.reviewRepository.find({
        where: { groupe: { id: group.id } }, // Trouver les reviews par le groupe
        relations: ['restaurant'], // Charger les relations avec les restaurants
      });

      // Extraire les restaurants uniques de ces reviews
      const uniqueRestaurants = Array.from(
        new Set(reviews.map((r) => r.restaurant.id)),
      ).map((id) => reviews.find((r) => r.restaurant.id === id).restaurant);

      restaurantsByGroup[group.id] = uniqueRestaurants;
    }

    return restaurantsByGroup;
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
