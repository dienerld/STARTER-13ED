// PASCAL CASE => Primeira maiuscula, iniciais sempre maiuscula
// Ex: CasaPadrao
// MOLDE - class
class Casa {
	// atributos - caracteristicas para o objeto
	quantidadeJanelas: number;
	quantidadePortas: number;
	largura: number;
	altura: number;
	cor: string = 'Amarela';

	// sempre será executado toda vez que rodar new ...
	constructor(
		qtdJanelas: number,
		qtdPortas: number,
		larg: number,
		alt: number,
		cor?: string
	) {
		// this = a esta instancia
		this.quantidadeJanelas = qtdJanelas;
		this.quantidadePortas = qtdPortas;
		this.altura = alt;
		this.largura = larg;
		this.cor = cor ?? this.cor;
	}

	// definir todos os métodos/ações possíveis para esta classe
	trocarCor(novaCor: string) {
		// QUAL É A NOVA COR?
		this.cor = novaCor;
	}

	reformarCasa(
		novaQtdJanela: number,
		novaQtdPorta: number,
		novaCor: string,
		novaLargura: number,
		novaAltura: number
	) {
		// VAI MUDAR O QUE?
		this.quantidadeJanelas = novaQtdJanela;
		this.quantidadePortas = novaQtdPorta;
		this.cor = novaCor;
		this.largura = novaLargura;
		this.altura = novaAltura;
	}

	abrirJanelas() {
		console.log('Janelas abertas');
	}

	fecharJanelas() {
		console.log('Janelas fechadas');
	}

	calcularMetrosQuadrados(): number {
		// escrevam essa lógica

		return 10; // troquem pelo resultado do calculo
	}
}

export default Casa;
