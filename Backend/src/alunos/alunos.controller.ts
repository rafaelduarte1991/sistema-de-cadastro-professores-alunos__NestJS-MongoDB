import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { Aluno } from './alunos.model';
import {AlunosService} from './alunos.service';

@Controller('alunos')
export class AlunosController {

    constructor(private readonly alunosService:AlunosService){}
 
    @Get()
    async buscaTodosAlunos(): Promise<any>{

        return this.alunosService.buscarTodosAlunos();
    }
    @Get(':tia')
    buscaEstudante( @Param('tia') tia: number ){
        return this.alunosService.getStudentByTIA(tia);
    }

    @Post()
    async CriarAluno(@Body()aluno:Aluno): Promise<any>{
        
        var resposta = await this.alunosService.criarAluno(aluno);
        return {id : resposta};
        
    }

     @Delete(':tia')
     async deletarEstudante(@Param('tia') tia: number){
         await this.alunosService.deleteStudent(tia);
         return null;
     }

    @Patch()
    async atualizarEstudante(@Body()aluno:Aluno):Promise <any> {
        return await this.alunosService.updateStudent(aluno);
    }

   
}
