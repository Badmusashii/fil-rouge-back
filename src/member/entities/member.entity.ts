import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Groupe } from 'src/groupe/entities/groupe.entity';

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

  @ManyToMany(() => Groupe, (groupe) => groupe.members)
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
