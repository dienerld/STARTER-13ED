import listaAlunos from '../../database';
import { AtualizarAluno } from '../../types';

// UPDATE
function atualizarAluno(id: string, novosDados: AtualizarAluno) {
	// poderemos atualizar apenas nome e cpf?

	const index = listaAlunos.findIndex((aluno) => aluno.id === id);

	if (index === -1) {
		console.log('Aluno não encontrado pelo ID informado');
		return;
	}

	const dadoAntigo = listaAlunos[index];

	listaAlunos[index].nome = novosDados.nome ?? dadoAntigo.nome;
	listaAlunos[index].cpf = novosDados.cpf ?? dadoAntigo.cpf;
	listaAlunos[index].matricula = novosDados.matricula ?? dadoAntigo.matricula;
	console.log(listaAlunos);
}

export default atualizarAluno;
