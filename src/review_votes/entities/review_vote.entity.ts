import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Review } from 'src/review/entities/review.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Entity()
@Unique(['idRestaurant', 'idMember'])
export class ReviewVote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idReview: number;

  @Column()
  idRestaurant: number;

  @Column()
  idMember: number;

  @Column({ type: 'boolean' })
  thumbs_up: boolean;

  @Column({ type: 'boolean' })
  thumbs_down: boolean;

  @ManyToOne(() => Review, (review) => review.id)
  review: Review;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  restaurant: Restaurant;

  @ManyToOne(() => Member, (member) => member.id)
  member: Member;
}
