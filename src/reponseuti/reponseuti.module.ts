import { Module } from '@nestjs/common';
import { ReponseutiService } from './reponseuti.service';
import { ReponseutiController } from './reponseuti.controller';

@Module({
  controllers: [ReponseutiController],
  providers: [ReponseutiService],
})
export class ReponseutiModule {}
