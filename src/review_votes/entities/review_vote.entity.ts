import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Review } from 'src/review/entities/review.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Entity('review_votes')
@Unique(['idRestaurant', 'idMember'])
export class ReviewVote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idReview' })
  idReview: number;

  @Column({ name: 'idRestaurant' })
  idRestaurant: number;

  @Column({ name: 'idMember' })
  idMember: number;

  @Column({ type: 'boolean' })
  thumbs_up: boolean;

  @Column({ type: 'boolean' })
  thumbs_down: boolean;

  @ManyToOne(() => Review, (review) => review.id)
  @JoinColumn({ name: 'idReview' })
  review: Review;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  restaurant: Restaurant;

  @ManyToOne(() => Member, (member) => member.id)
  member: Member;
}
