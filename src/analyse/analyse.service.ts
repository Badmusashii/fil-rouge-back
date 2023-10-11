import { Injectable } from '@nestjs/common';
import { CreateAnalyseDto } from './dto/create-analyse.dto';
import { UpdateAnalyseDto } from './dto/update-analyse.dto';
import { Analyse } from './entities/analyse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyseService {
  constructor(
    @InjectRepository(Analyse)
    private analyseRepository : Repository<Analyse>,
  ){}
  async create(createAnalyseDto: CreateAnalyseDto) {
    const analyse = this.analyseRepository.create(createAnalyseDto);
    return await this.analyseRepository.save(analyse);
  }

  async findAll() {
    return await this.analyseRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} analyse`;
  }

  update(id: number, updateAnalyseDto: UpdateAnalyseDto) {
    return `This action updates a #${id} analyse`;
  }

  remove(id: number) {
    return `This action removes a #${id} analyse`;
  }
}
