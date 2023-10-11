import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur) private utilisateurRepository: Repository<Utilisateur>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { email,pseudo,mdp,role: idRole } = createAuthDto;

    // Charge l'entité Role associée à l'identifiant idRole
    const role = await this.roleRepository.findOne({ where: { idRole } });

    if (!role) {
      // Gérez le cas où le rôle n'existe pas
      throw new NotFoundException('Rôle non trouvé');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(mdp, salt);
    const utilisateur = this.utilisateurRepository.create({
      email,
      pseudo,
      mdp: hashedPassword,
      role
    });
    try {
      const createdUtilisateur = await this.utilisateurRepository.save(utilisateur);
      //delete createdUtilisateur.mdp;
      return createdUtilisateur;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Ce pseudo existe deja');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async login(loginDto: LoginDto) {
    const { email, mdp } = loginDto;
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { email: email },
    });
    console.log('cote log meth ' + utilisateur);
    if (utilisateur && (await bcrypt.compare(mdp, utilisateur.mdp))) {
      const payload = { email, sub: utilisateur.idUtilisateur };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Probleme dans vos identifiants !');
    }
  }

  async comparePasswords(
    password: string,
    utilisateurPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, utilisateurPassword);
  }

  async update(utilisateur: Utilisateur, updateDto: UpdateAuthDto) {
    console.log('utilisateurpass ' + utilisateur.mdp);
    console.log('update ' + updateDto.newPassword);
    console.log(updateDto);
    const isPasswordValid = await this.comparePasswords(
      updateDto.currentPassword,
      utilisateur.mdp,
    );
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new Error('Le mot de passe actuel est incorrect');
    }
    const hashedPassword = await bcrypt.hash(updateDto.newPassword, 10);
    utilisateur.mdp = hashedPassword;
    await this.utilisateurRepository.save(utilisateur);

    return { message: 'Mot de passe mis à jour avec succès.' };
  }
}
