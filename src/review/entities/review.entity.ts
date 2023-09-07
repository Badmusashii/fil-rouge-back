import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Groupe } from 'src/groupe/entities/groupe.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  review: string;

  @Column({ type: 'boolean' })
  vote: boolean;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'idMember' })
  member: Member;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'idRestaurant' })
  restaurant: Restaurant;

  @OneToMany(() => Groupe, (groupe) => groupe.review)
  groupe: Groupe[];
}
