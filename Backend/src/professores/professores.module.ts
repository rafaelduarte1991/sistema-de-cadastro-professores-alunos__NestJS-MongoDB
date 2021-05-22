import { Module } from '@nestjs/common';
import { ProfessoresController } from './professores.controller';
import { ProfessoresService } from './professores.service';
import {  ProfessorSchema } from "./professores.model";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name:'Professor', schema: ProfessorSchema }])],
  controllers: [ProfessoresController],
  providers: [ProfessoresService]
})
export class ProfessoresModule {}
