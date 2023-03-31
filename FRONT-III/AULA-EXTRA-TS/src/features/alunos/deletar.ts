import listaAlunos from '../../database';

// DELETE
function deletarAluno(id: string) {
	const index = listaAlunos.findIndex((aluno) => aluno.id === id);

	if (index === -1) {
		console.log('Aluno não encontrado pelo ID informado');
		return;
	}

	listaAlunos.splice(index, 1);
	console.log(listaAlunos);
}

export default deletarAluno;
