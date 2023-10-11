import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Analyse } from 'src/analyse/entities/analyse.entity';
import { Question } from 'src/question/entities/question.entity';
import { Reponseuti } from 'src/reponseuti/entities/reponseuti.entity';

@Entity()
export class Reponse {
  @PrimaryGeneratedColumn()
  idReponse: number;

  @Column({ length: 255, nullable: false })
  reponse: string;

  @ManyToOne(() => Analyse, analyse => analyse.reponses)
  analyse: Analyse;

  @ManyToOne(() => Question, question => question.reponses)
  question: Question;

  @OneToMany(() => Reponse, reponseuti => reponseuti.reponse)
  reponseuti: Reponseuti[];
}
