import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private jwtService: JwtService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { lastname, firstname, username, email, password } = createAuthDto;
    const salt = await bcrypt.genSalt();
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    const member = this.memberRepository.create({
      lastname,
      firstname,
      username,
      email,
      password: hashedPassword,
    });
    try {
      const createdMember = await this.memberRepository.save(member);
      delete createdMember.password;
      return createdMember;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Ce pseudo existe deja');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const member = await this.memberRepository.findOneBy({ email });
    if (member && (await bcrypt.compare(password, member.password))) {
      const payload = { email, sub: member.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Probleme dans vos identifiants !');
    }
  }

  //   async updatePassword(updateAuthDto:UpdateAuthDto, currentPassword:string,newPassword:string, id:number): Promise<void> {
  //     const member = await this.memberRepository.findOne({where:{id:id}});

  //     if (!member) {
  //      throw new Error('Utilisateur introuvable');
  //     }

  //     const isPasswordValid = await bcrypt.compare(currentPassword, member.password);

  //    if (!isPasswordValid) {
  //     throw new Error('L\'ancien mot de passe est incorrect');
  //   }

  //   // Implémentez ici la logique pour mettre à jour le mot de passe de l'utilisateur dans la base de données.
  //   // Par exemple, vous pouvez utiliser une bibliothèque de hachage comme bcrypt pour hacher le nouveau mot de passe
  //   // et le stocker dans la base de données.

  //   // Exemple (utilisant bcrypt) :
  //   const hashedPassword = await bcrypt.hash(newPassword, 10); // Hachez le nouveau mot de passe avec un coût de hachage de 10.

  //   member.password = hashedPassword;
  //   await this.memberRepository.save(member);
  // }

  async comparePasswords(
    password: string,
    memberPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, memberPassword);
  }

  async update(member: Member, updateDto: UpdateAuthDto) {
    console.log('memberpass ' + member.password);
    console.log('update ' + updateDto.newPassword);
    console.log(updateDto);
    const isPasswordValid = await this.comparePasswords(
      updateDto.currentPassword,
      member.password,
    );
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new Error('Le mot de passe actuel est incorrect');
    }
    const hashedPassword = await bcrypt.hash(updateDto.newPassword, 10);
    member.password = hashedPassword;
    await this.memberRepository.save(member);

    return { message: 'Mot de passe mis à jour avec succès.' };
  }
}
