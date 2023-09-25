import { Module } from '@nestjs/common';
import { ReviewVotesService } from './review_votes.service';
import { ReviewVotesController } from './review_votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewVote } from './entities/review_vote.entity';
import { Member } from 'src/member/entities/member.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Review } from 'src/review/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewVote, Member, Restaurant, Review])],
  controllers: [ReviewVotesController],
  providers: [ReviewVotesService],
})
export class ReviewVotesModule {}
