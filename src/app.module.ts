import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { Utilisateur } from './utilisateur/entities/utilisateur.entity';
import { Role } from './role/entities/role.entity';
import { TestModule } from './test/test.module';
import { QuestionModule } from './question/question.module';
import { AnalyseModule } from './analyse/analyse.module';
import { ReponseModule } from './reponse/reponse.module';
import { ReponseutiModule } from './reponseuti/reponseuti.module';
import { Analyse } from './analyse/entities/analyse.entity';
import { Question } from './question/entities/question.entity';
import { Reponse } from './reponse/entities/reponse.entity';
import { Reponseuti } from './reponseuti/entities/reponseuti.entity';
import { Test } from './test/entities/test.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env`] }),
    // ConfigModule pour la gestion du fichier environnement
    TypeOrmModule.forRoot({
      // TypeOrm et sa config pour se connecter à la BDD
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT), //possibilité de mettre + à la place de number et des parenthèses
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Utilisateur,Role,Analyse,Question,Reponse,Reponseuti,Test],
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
    AuthModule,
    UtilisateurModule,
    RoleModule,
    TestModule,
    QuestionModule,
    AnalyseModule,
    ReponseModule,
    ReponseutiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
