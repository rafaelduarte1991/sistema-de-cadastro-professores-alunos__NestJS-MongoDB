import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professor } from './professores.model';


@Injectable()
export class ProfessoresService {

    constructor(@InjectModel('Professor') private readonly professorModel: Model<any>) { }


    async buscarTodos(){
        const todos_os_professores = await this.professorModel.find().exec();
        return todos_os_professores;
    }
    async criarProfessor(professor:Professor){
       const modeloDeProfessor = new this.professorModel({ 
           
        nome: professor.nome,
        drt: professor.drt,
        disciplinas: professor.disciplinas,
        departamento: professor.departamento,
       })

       const result = await modeloDeProfessor.save()
       return result.id as string;

    }


    async getProfessorByGRD(drt: number): Promise<any> {
        const professor = await this.professorModel.findOne({drt: drt});
        if (!professor){
            throw new NotFoundException('Professor não cadastrado');
        }
        return {
            id: professor.id,
            nome: professor.nome,
            drt: professor.drt,
            disciplinas: professor.disciplina,
            departamento: professor.departamento
            
        }
    }

    async deleteProfessor(drt: number){
        const result = await this.professorModel.deleteOne({drt: drt}).exec();
        if (result.n === 0){
            throw new NotFoundException('Professor não encontrado, não foi possivel deletar o registro')
        }
    }

    async updateProfessor(professor: Professor): Promise<any>{
        const updatedProfessor = await this.professorModel.findOne({drt: professor.drt});
        if (!updatedProfessor){
            throw new NotFoundException('Não foi possivel encontrar o professor');
        }
        if (professor.nome){
            updatedProfessor.nome = professor.nome;
        }
        if (professor.disciplinas){
            updatedProfessor.disciplinas = professor.disciplinas;
        }
        if (professor.departamento){
            updatedProfessor.departamento = professor.departamento;
        }
        
        updatedProfessor.save();
        return {
            id: updatedProfessor.id,
            name: updatedProfessor.name,
            drt: updatedProfessor.drt,
            disciplinas: updatedProfessor.disciplinas,
            departamento: updatedProfessor.departamento,
         }
    }
    
}
