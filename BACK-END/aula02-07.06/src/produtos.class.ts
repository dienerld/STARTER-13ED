class Produto {
	id: string;
	nome: string;
	preco: number;
	private estoque: number;

	constructor(id: string, nome: string, preco: number) {
		this.estoque = 10; // estoque do novo produto começa sempre com zero
		this.nome = nome;
		this.id = id;
		this.preco = preco;
	}

	public adicionarEstoque(quantidade: number) {
		this.estoque = quantidade;
	}
}

export default Produto;
