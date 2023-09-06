import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { CreateMemberResponse } from 'src/interfaces/createMemberResponse';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async update(
    id: number,
    currentPassword: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id } });

    if (!member) {
      throw new HttpException(
        `Le membre est introuvable`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordMatching = await this.verifyPassword(
      currentPassword,
      member.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException('Mot de passe incorrect', HttpStatus.BAD_REQUEST);
    }

    if (updateMemberDto.password) {
      const saltRounds = 10;
      updateMemberDto.password = await bcrypt.hash(
        updateMemberDto.password,
        saltRounds,
      );
    }

    const updateMember = await this.memberRepository.save({
      ...member,
      ...updateMemberDto,
    });

    return updateMember;
  }

  findAll() {
    return `This action returns all member`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
