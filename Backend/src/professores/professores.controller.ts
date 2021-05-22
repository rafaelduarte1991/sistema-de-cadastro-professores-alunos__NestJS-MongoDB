
import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { Professor} from './professores.model';
import {ProfessoresService} from './professores.service';



@Controller('professores')
export class ProfessoresController {

    constructor(private readonly professoresService:ProfessoresService){}

    @Get()
    async buscaTodos(): Promise<any>{

        return this.professoresService.buscarTodos();

    }

    @Get(':drt')
    buscarProfessor( @Param('drt') drt: number ){
        return this.professoresService.getProfessorByGRD(drt);
    }

 
    @Post()
    async CriarProfessor(@Body() professor: Professor): Promise<any>{
        
        var resposta = await this.professoresService.criarProfessor(professor);
        return {id : resposta};
        
    }
  
    @Delete(':drt')
    async deletarProfessor(@Param('drt') drt: number){
        await this.professoresService.deleteProfessor(drt);
        return null;
    }

    @Patch()
    async atualizarProfessor(@Body() professor: Professor):Promise<any> {
        return await this.professoresService.updateProfessor(professor);
    }

    









}
