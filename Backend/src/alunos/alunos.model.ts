import * as mongoose from 'mongoose';

export const AlunoSchema = new mongoose.Schema({
    name: { type: String, required: true},
    tia: { type: String, required: true},
    course: { type: String, required: true}
});

export interface Aluno{
    id: string,
    name: string,
    tia: string,
    course: string
}