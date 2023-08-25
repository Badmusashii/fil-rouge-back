import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategorieModule } from './categorie/categorie.module';
import * as dotenv from 'dotenv';

import { Categorie } from './categorie/entities/categorie.entity';
import { MemberModule } from './member/member.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ReviewModule } from './review/review.module';
import { GroupModule } from './group/group.module';
import { MemberGroupModule } from './member-group/member-group.module';
import { Group } from './group/entities/group.entity';
import { Member } from './member/entities/member.entity';
import { MemberGroupe } from './member-group/entities/member-group.entity';
import { Restaurant } from './restaurant/entities/restaurant.entity';
import { Review } from './review/entities/review.entity';

dotenv.config({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Categorie, Group, Member, MemberGroupe, Restaurant, Review],
      // Endroit ou il faut mettre toutes les entités pour que typeOrm les prennent
      // en compte.
      synchronize: false,
      // "synchronize" doit rester sur false. Lorsqu'il est activé (true), TypeORM essaiera d'ajuster automatiquement les tables
      // dans la base de données en fonction de vos entités. Cela pourrait entraîner des changements non désirés.
      // Nous voulons avoir un contrôle total sur la structure de notre base de données.
      dropSchema: false,
      // Important de laisser "dropSchema" sur false. Si mis à true,
      // cela supprimera et recréera les tables lors de l'initialisation,
      // effaçant toutes les données.
      logging: true,
      // Permet d'afficher les requetes SQL de TypeOrm dans la console
    }),
    CategorieModule,
    MemberModule,
    RestaurantModule,
    ReviewModule,
    GroupModule,
    MemberGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
