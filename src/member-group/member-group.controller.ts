import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberGroupService } from './member-group.service';
import { CreateMemberGroupDto } from './dto/create-member-group.dto';
import { UpdateMemberGroupDto } from './dto/update-member-group.dto';

@Controller('member-group')
export class MemberGroupController {
  constructor(private readonly memberGroupService: MemberGroupService) {}

  @Post()
  create(@Body() createMemberGroupDto: CreateMemberGroupDto) {
    return this.memberGroupService.create(createMemberGroupDto);
  }

  @Get()
  findAll() {
    return this.memberGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberGroupDto: UpdateMemberGroupDto) {
    return this.memberGroupService.update(+id, updateMemberGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberGroupService.remove(+id);
  }
}
