// PARTIAL => criar um novo tipo a partir de um tipo existente porém todas as propriedades deste novo tipo serão opcionais
// type Teste = Partial<Aluno>;

// OMIT => cria um novo tipo removendo as propriedades que a gente definir
// type Teste2 = Omit<Teste, 'id' | 'matricula'>;

interface Aluno {
	id: string;
	nome: string;
	cpf: string;
	matricula: string;
}

type AtualizarAluno = Omit<Partial<Aluno>, 'id'>;

export { Aluno, AtualizarAluno };
