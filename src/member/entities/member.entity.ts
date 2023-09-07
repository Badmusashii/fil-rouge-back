import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  lastname: string;

  @Column({ length: 255 })
  firstname: string;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 60 })
  password: string;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.member)
  restaurants: Restaurant[];
}
