import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Price } from 'src/types/enumPrice';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Member } from 'src/member/entities/member.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  adresse: string;

  @Column({ type: 'enum', enum: Price })
  price: Price;

  @ManyToOne(() => Member, (member) => member.restaurants)
  @JoinColumn({ name: 'idMember' })
  member: Member;

  @ManyToOne(() => Categorie)
  @JoinColumn({ name: 'idCategorie' })
  categorie: Categorie;
}
