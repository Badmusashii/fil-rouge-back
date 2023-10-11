import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnalyseService } from './analyse.service';
import { CreateAnalyseDto } from './dto/create-analyse.dto';
import { UpdateAnalyseDto } from './dto/update-analyse.dto';

@Controller('analyse')
export class AnalyseController {
  constructor(private readonly analyseService: AnalyseService) {}

  @Post()
  create(@Body() createAnalyseDto: CreateAnalyseDto) {
    return this.analyseService.create(createAnalyseDto);
  }

  @Get()
  findAll() {
    return this.analyseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analyseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnalyseDto: UpdateAnalyseDto) {
    return this.analyseService.update(+id, updateAnalyseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analyseService.remove(+id);
  }
}
