import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { ProfessoresModule } from './professores/professores.module';
import { MongooseModule } from '@nestjs/mongoose';

//Lembre-se de inserir usuario, senha e nome do banco.

@Module({
  imports: [AlunosModule, ProfessoresModule, MongooseModule.forRoot('mongodb+srv://<USUARIO>>:<INSERIR SENHA>@cluster0.emkiq.mongodb.net/<NOME DB>?retryWrites=true&w=majority') ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
