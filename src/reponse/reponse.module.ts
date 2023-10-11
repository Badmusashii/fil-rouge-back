import { Module } from '@nestjs/common';
import { ReponseService } from './reponse.service';
import { ReponseController } from './reponse.controller';

@Module({
  controllers: [ReponseController],
  providers: [ReponseService],
})
export class ReponseModule {}
