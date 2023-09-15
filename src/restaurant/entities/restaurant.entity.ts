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

  @ManyToOne(() => Member, { eager: true })
  @JoinColumn({ name: 'idmember' })
  member: Member;

  @ManyToOne(() => Categorie, { eager: true })
  @JoinColumn({ name: 'idcategorie' })
  categorie: Categorie;
}
