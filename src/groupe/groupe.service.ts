import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const existingMember = await this.memberRepository.findOne({
      where: { id: member.id },
      relations: ['groupes'],
    });
    if (existingMember.groupes) {
      const alreadyHasGroup = existingMember.groupes.some(
        (group) => group.name === createGroupeDto.name,
      );
      if (alreadyHasGroup) {
        throw new BadRequestException('Vous avez déjà un groupe avec ce nom.');
      }
    }
    const newGroupe = this.groupeRepository.create(createGroupeDto);
    await this.groupeRepository.save(newGroupe);
    if (!existingMember.groupes) {
      existingMember.groupes = [];
    }
    existingMember.groupes.push(newGroupe);
    await this.memberRepository.save(existingMember);

    return { groupId: newGroupe.id, memberId: member.id };
  }

  async findAllUserForGroupe(groupeId: number, req) {
    const memberId = req.user.id;
    const groupe = await this.groupeRepository.findOne({
      where: { id: groupeId },
      relations: ['members'],
    });

    if (!groupe) {
      throw new NotFoundException('Groupe introuvable.');
    }
    const isMemberOfGroup = groupe.members.some(
      (member) => member.id === memberId,
    );

    if (!isMemberOfGroup) {
      throw new ForbiddenException(
        "Vous n'avez pas la permission de voir les membres de ce groupe.",
      );
    }
    for (const member of groupe.members) {
      delete member.password;
      delete member.email;
      delete member.firstname;
      delete member.lastname;
    }
    return groupe.members;
  }

  async findAllGroupeForUser(memberId: number) {
    const member = await this.memberRepository.findOne({
      where: { id: memberId },
      relations: ['groupes'],
    });
    if (!member) {
      throw new NotFoundException(
        `Utilisateur avec l'ID ${memberId} introuvable.`,
      );
    }
    return member.groupes;
  }

  async putAnUserInGroupe(member: Member, groupeId: number) {
    const groupe = await this.groupeRepository.findOne({
      where: { id: groupeId },
      relations: ['members'],
    });

    if (!groupe) {
      throw new NotFoundException(`Groupe avec l'ID ${groupeId} introuvable.`);
    }

    const existingMember = await this.memberRepository.findOne({
      where: { id: member.id },
      relations: ['groupes'],
    });
    if (!existingMember) {
      throw new NotFoundException(
        `Utilisateur avec l'ID ${member.id} introuvable.`,
      );
    }
    // Vérifier si l'utilisateur est déjà dans le groupe
    const isAlreadyInGroup = groupe.members.some((x) => x.id === member.id);
    if (isAlreadyInGroup) {
      throw new BadRequestException("L'utilisateur est déjà dans ce groupe.");
    }

    existingMember.groupes.push(groupe);

    await this.memberRepository.save(existingMember);

    return { message: 'Utilisateur ajouté au groupe avec succès' };
  }

  update(id: number, updateGroupeDto: UpdateGroupeDto) {
    return `This action updates a #${id} group`;
  }

  async removeAndUserInGroupe(groupeId: number, member: Member) {
    const existingMember = await this.memberRepository.findOne({
      where: { id: member.id },
      relations: ['groupes'],
    });
    if (!existingMember) {
      throw new NotFoundException(
        `Utilisateur avec l'ID ${member.id} introuvable.`,
      );
    }
    const groupe = await this.groupeRepository.findOne({
      where: { id: groupeId },
      relations: ['members'],
    });

    if (!groupe) {
      throw new NotFoundException(`Groupe avec l'ID ${groupeId} introuvable.`);
    }
    const isAlreadyInGroup = groupe.members.some((x) => x.id === member.id);
    if (!isAlreadyInGroup) {
      throw new BadRequestException("Vous n'appartenez pas à ce groupe.");
    } else {
      // existingMember.groupes.(groupe);
      existingMember.groupes = existingMember.groupes.filter(
        (g) => g.id !== groupe.id,
      );
      await this.memberRepository.save(existingMember);
    }
  }
}
