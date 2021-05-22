import { Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlunoSchema } from './alunos.model';


@Module({
  imports: [MongooseModule.forFeature([{name:'Aluno', schema:AlunoSchema}])],
  controllers: [AlunosController],
  providers: [AlunosService]
})
export class AlunosModule {}
