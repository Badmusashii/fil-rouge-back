import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity()
export class Groupe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @ManyToMany(() => Member, (member) => member.groupes)
  @JoinTable({
    name: 'membergroupe',
    joinColumn: {
      name: 'idgroupe',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idmember',
      referencedColumnName: 'id',
    },
  })
  members: Member[];

  @ManyToOne(() => Review, (review) => review.groupe)
  @JoinColumn({ name: 'idreview' })
  review: Review;
}
