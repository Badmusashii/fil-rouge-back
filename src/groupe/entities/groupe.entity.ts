import { Review } from 'src/review/entities/review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Groupe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(() => Review, (review) => review.groupe)
  @JoinColumn({ name: 'idReview' })
  review: Review;
}
