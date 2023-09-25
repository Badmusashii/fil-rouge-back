import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieModule } from 'src/categorie/categorie.module';
import { MemberModule } from 'src/member/member.module';
import { GroupeModule } from 'src/groupe/groupe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    CategorieModule,
    MemberModule,
    GroupeModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [TypeOrmModule.forFeature([Restaurant])],
})
export class RestaurantModule {}
