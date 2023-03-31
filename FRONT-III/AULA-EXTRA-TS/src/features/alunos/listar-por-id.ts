import listaAlunos from '../../database';

// LIST BY ID
function buscarPorID(id: string) {
	const alunoEncontrado = listaAlunos.find((aluno) => aluno.id === id);

	// null, undefined, "", 0, false => false
	if (!alunoEncontrado) {
		console.log('Nenhum aluno encontrado pelo ID informado.');
		return;
	}

	console.log(alunoEncontrado);
}

export default buscarPorID;
