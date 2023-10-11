import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Test } from 'src/test/entities/test.entity';
import { Reponse } from 'src/reponse/entities/reponse.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  idQuestion: number;

  @Column({ length: 255, nullable: false })
  question: string;

  @ManyToOne(() => Test, test => test.questions)
  @JoinColumn({ name: 'idTest' })
  test: Test;

  @OneToMany(() => Reponse, reponse => reponse.question)
  reponses: Reponse[];
}
