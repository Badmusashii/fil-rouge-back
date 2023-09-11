import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GroupeService } from './groupe.service';
import { CreateGroupeDto } from './dto/create-groupe.dto';
import { UpdateGroupeDto } from './dto/update-groupe.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('groupe')
export class GroupeController {
  constructor(private readonly groupeService: GroupeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req, @Body() createGroupeDto: CreateGroupeDto) {
    const member = req.user;
    return this.groupeService.createAndAssign(createGroupeDto, member);
  }
  @Get()
  findAll() {
    return this.groupeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupeDto: UpdateGroupeDto) {
    return this.groupeService.update(+id, updateGroupeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupeService.remove(+id);
  }
}
