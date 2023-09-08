import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CategorieModule } from 'src/categorie/categorie.module';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    CategorieModule,
    MemberModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
