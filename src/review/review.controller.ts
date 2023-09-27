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
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':idRestaurant')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Request() req,
    @Param('idRestaurant') idRestaurant: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const member = req.user;
    console.log(member);
    console.log('le creatDto ' + JSON.stringify(createReviewDto));
    return this.reviewService.create(createReviewDto, member, +idRestaurant);
  }

  @Get('restaurant/:id')
  @UseGuards(AuthGuard('jwt'))
  async findAllByRestaurantId(@Param('id') id: number) {
    return await this.reviewService.findAllByRestaurantId(+id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const memberId = req.user.id;
    return this.reviewService.update(+id, updateReviewDto, memberId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
