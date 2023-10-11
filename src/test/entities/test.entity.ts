import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  idTest: number;

  @Column({ length: 255, nullable: false })
  nom: string;

  @Column({ length: 255, nullable: false })
  description: string;

  @Column('text', { nullable: false })
  resultat: string;

  @OneToMany(() => Question, question => question.test)
  questions: Question[];
}
