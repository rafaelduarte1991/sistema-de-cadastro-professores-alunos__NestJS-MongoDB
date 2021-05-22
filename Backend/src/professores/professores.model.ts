import * as mongoose from 'mongoose';

export const ProfessorSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    drt: { type: String, required: true},
    disciplinas:{ type: String, required: true},
    departamento: { type: String, required: true},
});

export interface Professor{
    id: string,
    nome: string,
    drt: string,
    disciplinas: string,
    departamento: string,
}