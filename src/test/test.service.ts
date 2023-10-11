import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository : Repository<Test>,
  ){}

  async create(createTestDto: CreateTestDto) {
    const test = this.testRepository.create(createTestDto);
    return await this.testRepository.save(test);
  }

  async findAll() {
    return await this.testRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.testRepository.findOne({ where: { idTest: id } });
    } catch (error) {
      throw new NotFoundException('Test non trouvé');
    }
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
