import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
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

  // @Column({ type: 'boolean' })
  // vote: boolean;

  @ManyToOne(() => Member, (m) => m.reviews, { eager: false })
  @JoinColumn({ name: 'idmember' })
  member: Member;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'idrestaurant' })
  restaurant: Restaurant;

  @ManyToMany(() => Groupe, (groupe) => groupe.reviews, { cascade: true })
  @JoinTable({
    name: 'review_groupe',
    joinColumn: {
      name: 'idreview',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idgroupe',
      referencedColumnName: 'id',
    },
  })
  groupes: Groupe[];
}
