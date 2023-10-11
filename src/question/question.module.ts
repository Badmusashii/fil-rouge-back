import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Test } from 'src/test/entities/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question]),TypeOrmModule.forFeature([Test])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
