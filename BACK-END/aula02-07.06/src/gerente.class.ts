import Funcionario from './funcionario.class';

// INTERFACE - protótipo de ações possiveis e que serão implementadas na classe
// implementa apenas métodos
interface GerenteComercial {
	receberAdicional: () => void;
	atualizarDados: (novoNome: string, novoCpf: string) => void;
	mostrarDados: () => void;
}

// herança - extends Funcionario
// encapsulamento - implements GerenteComercial
class Gerente extends Funcionario implements GerenteComercial {
	adicionalSalario: number;

	constructor(
		adicionalSalario: number,
		nomeGerente: string,
		cpfGerente: string,
		salarioGerente: number
	) {
		// super - dá o start no construtor da classe Pai
		super(nomeGerente, cpfGerente, salarioGerente);
		this.adicionalSalario = adicionalSalario;
	}

	// o método deve ter a mesma assinatura
	receberBonificacao(valor: number): void {
		// implementação é o que muda
		// polimorfo - nova forma/implementacao
		if (valor > 500) {
			const totalPerc = this.salario * 0.1;

			this.salario += valor + totalPerc;
		} else {
			this.salario += valor;
		}
	}

	receberAdicional() {
		// aqui dizemos o que vai acontecer / lógica
		this.salario += this.adicionalSalario;
	}

	atualizarDados(novoNome: string, novoCpf: string) {
		this.setNome(novoNome);
		this.cpf = novoCpf;
	}

	mostrarDados() {
		console.log(this.getNome());
		console.log(this.cpf);
	}

	toJson(): string {
		return JSON.stringify({
			nome: this.getNome(),
			cpf: this.cpf,
			salario: this.salario,
		});
	}
}

export default Gerente;
