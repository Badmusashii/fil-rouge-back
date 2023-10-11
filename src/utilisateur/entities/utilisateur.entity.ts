import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Reponseuti } from 'src/reponseuti/entities/reponseuti.entity';
@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  idUtilisateur: number;

  @Column({ length: 255, nullable: false })
  email: string;

  @Column({ length: 255, nullable: false })
  pseudo: string;

  @Column({ length: 60, nullable: false })
  mdp: string;

  @ManyToOne(() => Role, role => role.utilisateurs)
  role: Role;

  @OneToMany(() => Reponseuti, reponseuti => reponseuti.utilisateur)
  reponseuti: Reponseuti[];
}
