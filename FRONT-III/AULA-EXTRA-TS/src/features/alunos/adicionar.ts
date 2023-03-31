import listaAlunos from '../../database';
import { Aluno } from '../../types';

// CREATE
function adicionarAlunos(novoAluno: Aluno) {
	if (listaAlunos.some((aluno) => aluno.cpf === novoAluno.cpf)) {
		console.log(
			'Já existe um ouro aluno cadastrado com o mesmo CPF informado'
		);
		return;
	}

	listaAlunos.push(novoAluno);
	console.log(listaAlunos);
}

export default adicionarAlunos;
