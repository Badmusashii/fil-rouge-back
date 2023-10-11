import { Reponse } from "src/reponse/entities/reponse.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reponseuti {
  @PrimaryGeneratedColumn()
  idReponseUti: number;

  @Column()
  score: number;

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.reponseuti)
  @JoinColumn({ name: 'idUtilisateur' })
  utilisateur: Utilisateur;

  @ManyToOne(() => Reponse, reponse => reponse.reponseuti)
  @JoinColumn({ name: 'idReponse' })
  reponse: Reponse;
}
