import { Tarefa } from '../types';
import gerarData from '../utils/geradorData';
import { v4 as gerarId } from 'uuid';

const listaTarefas: Tarefa[] = [
	{
		id: gerarId(),
		titulo: 'Titulo 1',
		criadoEm: gerarData(),
	},
	{
		id: gerarId(),
		titulo: 'Titulo 2',
		criadoEm: gerarData(),
	},
	{
		id: gerarId(),
		titulo: 'Titulo 3',
		criadoEm: gerarData(),
	},
	{
		id: gerarId(),
		titulo: 'Titulo 4',
		criadoEm: gerarData(),
	},
	{
		id: gerarId(),
		titulo: 'Titulo 5',
		criadoEm: gerarData(),
	},
];

export default listaTarefas;
