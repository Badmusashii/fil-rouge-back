import { Module, forwardRef } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { GroupeModule } from 'src/groupe/groupe.module';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    forwardRef(() => RestaurantModule),
    GroupeModule,
    MemberModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [TypeOrmModule.forFeature([Review])],
})
export class ReviewModule {}
