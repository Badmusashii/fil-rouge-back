import { Injectable } from '@nestjs/common';
import { CreateGroupeDto } from './dto/create-groupe.dto';
import { UpdateGroupeDto } from './dto/update-groupe.dto';

@Injectable()
export class GroupeService {
  create(createGroupeDto: CreateGroupeDto) {
    return 'This action adds a new group';
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupeDto: UpdateGroupeDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
