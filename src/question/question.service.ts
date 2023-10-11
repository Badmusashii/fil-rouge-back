import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from 'src/test/entities/test.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository : Repository<Question>,
    @InjectRepository(Test)
    private testRepository : Repository<Test>,
  ){}

  async create(createQuestionDto: CreateQuestionDto) {
    let question = new Question();
    question.question = createQuestionDto.question;
    let test = await this.testRepository.findOne({ where: { idTest: createQuestionDto.idTest } });
    question.test = test;
    return await this.questionRepository.save(question);
  }

  async findAll() {
    return await this.questionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
