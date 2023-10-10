import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  idRole: number;

  @Column({ length: 255 })
  nom: string;
}