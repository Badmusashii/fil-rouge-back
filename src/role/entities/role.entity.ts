import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  idRole: number;

  @Column({ length: 255, nullable: false })
  nom: string;

  @OneToMany(() => Utilisateur, utilisateur => utilisateur.role)
  utilisateurs: Utilisateur[];
}