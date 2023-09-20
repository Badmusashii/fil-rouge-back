import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateMemberResponse } from 'src/interfaces/createMemberResponse';

@Injectable()
export class MemberService implements OnModuleInit {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private jwt: JwtService,
  ) {}

  onModuleInit() {
    console.log('le .env ' + process.env.ACCESS_TOKEN_SECRET);
  }

  async update(
    id: number,
    currentPassword: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id: id } });

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
    return this.memberRepository.find();
  }

  findOne(member: Member) {
    delete member.email;
    delete member.password;
    delete member.id;
    return member;
  }
  async findOneByEmail(email: string) {
    const futurMember = await this.memberRepository.findOne({
      where: { email: email },
    });
    console.log(futurMember);
    if (futurMember) {
      const payload = { userId: futurMember.id };
      const token = this.jwt.sign(payload, { expiresIn: '48h' });
      delete futurMember.password;
      delete futurMember.email;

      return { futurMember, token };
    } else {
      return false;
    }
  }

  async remove(member: Member) {
    const result = await this.memberRepository.delete(member.id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Le membre ${member.username} n'a pas été trouver`,
      );
    }
  }
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
