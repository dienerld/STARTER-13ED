// INTERFACE - protótipo de ações possiveis e que serão implementadas na classe
// implementa apenas métodos
interface GerenteComercial {
	receberAdicional: () => void;
	atualizarDados: (novoNome: string, novoCpf: string) => void;
	mostrarDados: () => void;
}

export default GerenteComercial;
