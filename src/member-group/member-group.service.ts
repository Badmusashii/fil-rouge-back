import { Injectable } from '@nestjs/common';
import { CreateMemberGroupDto } from './dto/create-member-group.dto';
import { UpdateMemberGroupDto } from './dto/update-member-group.dto';

@Injectable()
export class MemberGroupService {
  create(createMemberGroupDto: CreateMemberGroupDto) {
    return 'This action adds a new memberGroup';
  }

  findAll() {
    return `This action returns all memberGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberGroup`;
  }

  update(id: number, updateMemberGroupDto: UpdateMemberGroupDto) {
    return `This action updates a #${id} memberGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberGroup`;
  }
}
