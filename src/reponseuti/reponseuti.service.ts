import { Injectable } from '@nestjs/common';
import { CreateReponseutiDto } from './dto/create-reponseuti.dto';
import { UpdateReponseutiDto } from './dto/update-reponseuti.dto';

@Injectable()
export class ReponseutiService {
  create(createReponseutiDto: CreateReponseutiDto) {
    return 'This action adds a new reponseuti';
  }

  findAll() {
    return `This action returns all reponseuti`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reponseuti`;
  }

  update(id: number, updateReponseutiDto: UpdateReponseutiDto) {
    return `This action updates a #${id} reponseuti`;
  }

  remove(id: number) {
    return `This action removes a #${id} reponseuti`;
  }
}
