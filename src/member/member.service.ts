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

  async create(
    createMemberDto: CreateMemberDto,
  ): Promise<CreateMemberResponse> {
    try {
      const saltRounds = 10;
      const member = new Member();
      member.lastname = createMemberDto.lastname;
      member.firstname = createMemberDto.firstname;
      member.username = createMemberDto.username;
      member.email = createMemberDto.email;
      member.password = await bcrypt.hash(createMemberDto.password, saltRounds);

      await this.memberRepository.save(member);
      return {
        status: HttpStatus.OK,
        message: `Creation du menbre ${member.username} validé !`,
      };
    } catch (err) {
      if (err.code === '23505') {
        /* Le code 23505 attrape l'erreur de violation de contrainte d'unicité.
       Cela se produit généralement lorsqu'une tentative est faite d'insérer ou de mettre à jour une valeur en doublon
       dans une colonne qui a été marquée comme unique dans la base de données. */
        throw new HttpException(
          `Le pseudo ${createMemberDto.username} est deja utilisé !`,
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(`Une erreur c\'est produite lors de la creation : ${err}`);
      throw new HttpException(
        'La création du membre a échoué',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(username: string, password: string): Promise<any> {
    const member = await this.memberRepository.findOne({ where: { username } });
    const isPasswordMatching = await bcrypt.compare(password, member.password);
    if (!member) {
      throw new UnauthorizedException(`Le membre ${username} est introuvable`);
    }
    if (!isPasswordMatching) {
      throw new UnauthorizedException(
        "Nom d'utilisateur ou mot de passe incorrect",
      );
    }
    return {
      status: HttpStatus.OK,
      message: 'Connexion reussi !',
    };
  }

  // async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
  //   const member = await this.memberRepository.findOne({ where: { id } });

  //   if (!member) {
  //     throw new HttpException(
  //       `Le membre ${member.username} est introuvable`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   if (updateMemberDto.password) {
  //     const saltRounds = 10;
  //     updateMemberDto.password = await bcrypt.hash(
  //       updateMemberDto.password,
  //       saltRounds,
  //     );
  //   }
  //   const updateMember = await this.memberRepository.save({
  //     ...member,
  //     ...updateMemberDto,
  //   });

  //   return updateMember;
  // }
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

  // update(id: number, updateMemberDto: UpdateMemberDto) {
  //   return `This action updates a #${id} member`;
  // }

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
