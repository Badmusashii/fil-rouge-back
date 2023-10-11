import { Injectable } from '@nestjs/common';
import { CreateReponseDto } from './dto/create-reponse.dto';
import { UpdateReponseDto } from './dto/update-reponse.dto';

@Injectable()
export class ReponseService {
  create(createReponseDto: CreateReponseDto) {
    return 'This action adds a new reponse';
  }

  findAll() {
    return `This action returns all reponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reponse`;
  }

  update(id: number, updateReponseDto: UpdateReponseDto) {
    return `This action updates a #${id} reponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} reponse`;
  }
}
