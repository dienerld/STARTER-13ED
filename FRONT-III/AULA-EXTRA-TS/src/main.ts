// import/export => utilização de módulos
// typescript => conseguir ativar os recursos do IntelliSense e também na tipagem dos dados

import {
	adicionarAlunos,
	atualizarAluno,
	buscarPorID,
	deletarAluno,
} from './features/alunos';

adicionarAlunos({
	id: '1',
	nome: 'João da Silva',
	cpf: '000.111.222-33',
	matricula: '0102-5',
});

adicionarAlunos({
	id: '2',
	nome: 'Maria da Silva',
	cpf: '000.222.333-44',
	matricula: '0103-5',
});

buscarPorID('1');

atualizarAluno('1', { cpf: '000.222.333-44', nome: 'João da Silva Sauro' });

deletarAluno('1');
