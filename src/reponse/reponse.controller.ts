import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReponseService } from './reponse.service';
import { CreateReponseDto } from './dto/create-reponse.dto';
import { UpdateReponseDto } from './dto/update-reponse.dto';

@Controller('reponse')
export class ReponseController {
  constructor(private readonly reponseService: ReponseService) {}

  @Post()
  create(@Body() createReponseDto: CreateReponseDto) {
    return this.reponseService.create(createReponseDto);
  }

  @Get()
  findAll() {
    return this.reponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReponseDto: UpdateReponseDto) {
    return this.reponseService.update(+id, updateReponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reponseService.remove(+id);
  }
}
