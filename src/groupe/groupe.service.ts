import { Injectable } from '@nestjs/common';
import { CreateGroupeDto } from './dto/create-groupe.dto';
import { UpdateGroupeDto } from './dto/update-groupe.dto';
import { Member } from 'src/member/entities/member.entity';
import { Groupe } from './entities/groupe.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class GroupeService {
  constructor(
    @InjectRepository(Groupe)
    private groupeRepository: Repository<Groupe>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>, // @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async createAndAssign(createGroupeDto: CreateGroupeDto, member: Member) {
    const newGroupe = this.groupeRepository.create(createGroupeDto);
    await this.groupeRepository.save(newGroupe);
    const existingMember = await this.memberRepository.findOne({
      where: { id: member.id },
      relations: ['groupes'],
    });
    if (!existingMember.groupes) {
      existingMember.groupes = [];
    }
    existingMember.groupes.push(newGroupe);
    await this.memberRepository.save(existingMember);

    return { groupId: newGroupe.id, memberId: member.id };
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupeDto: UpdateGroupeDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
