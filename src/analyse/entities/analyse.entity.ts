import { Reponse } from 'src/reponse/entities/reponse.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Analyse {
  @PrimaryGeneratedColumn()
  idAnalyse: number;

  @Column('text', { nullable: false })
  analyse: string;

  @OneToMany(() => Reponse, reponse => reponse.analyse)
  reponses: Reponse[];
}

