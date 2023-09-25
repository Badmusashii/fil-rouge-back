import { Injectable } from '@nestjs/common';
import { CreateReviewVoteDto } from './dto/create-review_vote.dto';
import { UpdateReviewVoteDto } from './dto/update-review_vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewVote } from './entities/review_vote.entity';
import { Repository } from 'typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Review } from 'src/review/entities/review.entity';

@Injectable()
export class ReviewVotesService {
  constructor(
    @InjectRepository(ReviewVote)
    private reviewvoteRepository: Repository<ReviewVote>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  // async createVote(
  //   user,
  //   createReviewVoteDto: CreateReviewVoteDto,
  // ): Promise<any> {
  //   const newVote = new ReviewVote();
  //   newVote.idMember = user.id;
  //   newVote.idRestaurant = createReviewVoteDto.idRestaurant;
  //   return await this.reviewvoteRepository.save(newVote);
  // }

  async createVote(
    user,
    createReviewVoteDto: CreateReviewVoteDto,
  ): Promise<any> {
    const member = await this.memberRepository.findOne({
      where: { id: user.id },
    });
    if (!member) {
      throw new Error("Ce membre n'existe pas");
    }
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: createReviewVoteDto.idRestaurant },
    });
    if (!restaurant) {
      throw new Error("Ce restaurant n'existe pas");
    }
    const existingVote = await this.reviewvoteRepository.findOne({
      where: {
        idMember: user.id,
        idRestaurant: createReviewVoteDto.idRestaurant,
      },
    });
    if (existingVote) {
      throw new Error('Vous avez deja voté pour ce restaurant');
    }
    const newVote = new ReviewVote();
    newVote.idMember = user.id;
    newVote.idRestaurant = createReviewVoteDto.idRestaurant;
    newVote.thumbs_up = createReviewVoteDto.thumbs_up;
    newVote.thumbs_down = createReviewVoteDto.thumbs_down;

    console.log('idMember from token:', newVote.idMember);
    console.log('idRestaurant:', newVote.idRestaurant);
    console.log('thumbs_up:', newVote.thumbs_up);

    return await this.reviewvoteRepository.save(newVote);
  }

  findAll() {
    return `This action returns all reviewVotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewVote`;
  }

  update(id: number, updateReviewVoteDto: UpdateReviewVoteDto) {
    return `This action updates a #${id} reviewVote`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewVote`;
  }
}
