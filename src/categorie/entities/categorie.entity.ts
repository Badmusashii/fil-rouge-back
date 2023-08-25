import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Categorie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
