import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReponseutiService } from './reponseuti.service';
import { CreateReponseutiDto } from './dto/create-reponseuti.dto';
import { UpdateReponseutiDto } from './dto/update-reponseuti.dto';

@Controller('reponseuti')
export class ReponseutiController {
  constructor(private readonly reponseutiService: ReponseutiService) {}

  @Post()
  create(@Body() createReponseutiDto: CreateReponseutiDto) {
    return this.reponseutiService.create(createReponseutiDto);
  }

  @Get()
  findAll() {
    return this.reponseutiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reponseutiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReponseutiDto: UpdateReponseutiDto) {
    return this.reponseutiService.update(+id, updateReponseutiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reponseutiService.remove(+id);
  }
}
