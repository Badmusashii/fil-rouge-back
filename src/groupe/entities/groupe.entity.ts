import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Groupe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;
}
