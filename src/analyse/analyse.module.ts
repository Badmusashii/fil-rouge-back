import { Module } from '@nestjs/common';
import { AnalyseService } from './analyse.service';
import { AnalyseController } from './analyse.controller';
import { Analyse } from './entities/analyse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Analyse])],
  controllers: [AnalyseController],
  providers: [AnalyseService],
})
export class AnalyseModule {}
