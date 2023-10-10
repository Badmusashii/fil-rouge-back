import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Entity('utilisateur')
export class Utilisateur {
  @PrimaryGeneratedColumn()
  idUtilisateur: number;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  pseudo: string;

  @Column({ length: 60 })
  mdp: string;

  @Column()
  idRole: number;

  @ManyToOne(type => Role)
  @JoinColumn({ name: 'idRole' })
  role: Role; // Ceci crée une relation avec l'entité Role
}