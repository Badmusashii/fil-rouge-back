import { Module } from '@nestjs/common';
import { GroupeService } from './groupe.service';
import { GroupeController } from './groupe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Groupe } from './entities/groupe.entity';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([Groupe]), MemberModule],
  controllers: [GroupeController],
  providers: [GroupeService],
})
export class GroupeModule {}
