import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ length: 65 })
  password: string;
}
