import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), RestaurantModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
