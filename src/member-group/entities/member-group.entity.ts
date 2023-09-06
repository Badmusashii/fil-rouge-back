import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Groupe } from 'src/groupe/entities/groupe.entity';

@Entity()
export class MemberGroupe {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'idMember' })
  member: Member;

  @ManyToOne(() => Groupe)
  @JoinColumn({ name: 'idGroupe' })
  group: Groupe;
}
