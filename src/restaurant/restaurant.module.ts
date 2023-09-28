import { Module, forwardRef } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieModule } from 'src/categorie/categorie.module';
import { MemberModule } from 'src/member/member.module';
import { GroupeModule } from 'src/groupe/groupe.module';
import { ReviewModule } from 'src/review/review.module';
import { ReviewService } from 'src/review/review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    CategorieModule,
    MemberModule,
    GroupeModule,
    forwardRef(() => ReviewModule),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, ReviewService],
  exports: [TypeOrmModule.forFeature([Restaurant])],
})
export class RestaurantModule {}
