import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Groupe } from 'src/groupe/entities/groupe.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  lastname: string;

  @Column({ length: 255 })
  firstname: string;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 60 })
  password: string;

  @OneToMany(() => Review, (review) => review.member)
  reviews: Review[];

  @ManyToMany(() => Groupe, (groupe) => groupe.members, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'membergroupe',
    joinColumn: {
      name: 'idmember',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idgroupe',
      referencedColumnName: 'id',
    },
  })
  groupes: Groupe[];
}
