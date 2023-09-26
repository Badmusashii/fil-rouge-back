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
@Unique(['idRestaurant', 'idMember']) // Remarque: les noms de colonnes ont été mis en minuscules ici aussi
export class ReviewVote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idreview' }) // Remarque: le nom de colonne a été mis en minuscule
  idReview: number;

  @Column({ name: 'idrestaurant' }) // Remarque: le nom de colonne a été mis en minuscule
  idRestaurant: number;

  @Column({ name: 'idmember' }) // Remarque: le nom de colonne a été mis en minuscule
  idMember: number;

  @Column({ type: 'boolean' })
  thumbs_up: boolean;

  @Column({ type: 'boolean' })
  thumbs_down: boolean;

  @ManyToOne(() => Review, (review) => review.id)
  @JoinColumn({ name: 'idreview' }) // Remarque: le nom de colonne a été mis en minuscule
  review: Review;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  @JoinColumn({ name: 'idrestaurant' }) // Remarque: le nom de colonne a été mis en minuscule
  restaurant: Restaurant;

  @ManyToOne(() => Member, (member) => member.id)
  @JoinColumn({ name: 'idmember' }) // Remarque: le nom de colonne a été mis en minuscule
  member: Member;
}
