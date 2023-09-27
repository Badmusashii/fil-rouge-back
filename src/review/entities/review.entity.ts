import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Groupe } from 'src/groupe/entities/groupe.entity';

@Entity()
@Unique(['member', 'restaurant', 'groupe'])
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  review: string;

  @Column({ type: 'boolean' })
  vote: boolean;

  @ManyToOne(() => Member, (member) => member.reviews, { eager: true })
  @JoinColumn({ name: 'idmember' })
  member: Member;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews, {
    eager: false,
  })
  @JoinColumn({ name: 'idrestaurant' })
  restaurant: Restaurant;

  @ManyToOne(() => Groupe, (groupe) => groupe.reviews, { eager: true })
  @JoinColumn({ name: 'idgroupe' })
  groupe: Groupe;
}
