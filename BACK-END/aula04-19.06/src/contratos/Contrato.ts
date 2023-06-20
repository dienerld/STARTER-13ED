// DEFINE O QUE SERÁ POSSIVEL FAZER PARA ALUNO
export default interface ContratoAluno {
	realizarProva: () => void;
	calcularNota: (gabaritoProva: string[]) => void;
	aprovarOuReprovar: () => void;
}
