import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Member } from 'src/member/entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ signOptions: { expiresIn: '1h' }, secret: 'cool' }),
  ],
  controllers: [AuthController, JwtStrategy],
  providers: [AuthService, PassportModule],
})
export class AuthModule {}
