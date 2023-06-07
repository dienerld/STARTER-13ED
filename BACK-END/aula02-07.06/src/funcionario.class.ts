// abstract
abstract class Funcionario {
	private nome: string;
	private _cpf: string;
	protected salario: number;

	constructor(
		nomeFuncionario: string,
		cpfFuncionario: string,
		salarioFucionario: number
	) {
		this.nome = nomeFuncionario;
		this._cpf = cpfFuncionario;
		this.salario = salarioFucionario;
	}

	// coisas que um funcionario vai poder realizar
	receberBonificacao(valor: number) {
		this.salario += valor;
	}

	// getters
	// NOSSA FORMA
	protected getNome(): string {
		return this.nome;
	}

	// setters
	// NOSSA FORMA
	protected setNome(novoNome: string): void {
		this.nome = novoNome;
	}

	// getters typescript
	protected get cpf(): string {
		return this._cpf;
	}

	// setters typescript
	protected set cpf(novoCpf: string) {
		this._cpf = novoCpf;
	}
}

export default Funcionario;
