import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Group } from 'src/group/entities/group.entity';

@Entity()
export class MemberGroupe {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'idMember' })
  member: Member;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'idGroupe' })
  group: Group;
}
