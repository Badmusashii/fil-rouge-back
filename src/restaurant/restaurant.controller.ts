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
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService, ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req, @Body() createRestaurantDto: CreateRestaurantDto) {
    // const memberId = req.user.id;
    console.log(createRestaurantDto);
    const member = req.user;
    console.log(member);
    return this.restaurantService.create(createRestaurantDto, member);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }
}
