import Gerente from './gerente.class';
import Produto from './produtos.class';

// UMA LOJA POSSUI AO MENOS 1 GERENTE COMERCIAL E 1 GERENTE FINANCEIRO
class Loja {
	razaoSocial: string;
	responsavelComercial: Gerente;
	responsavelFinanceiro: Gerente;
	dataAbertura: Date;
	produtos: Produto[];

	constructor(
		razaoSocial: string,
		respComercial: Gerente,
		respFinanceiro: Gerente,
		dataAbertura: Date
	) {
		this.razaoSocial = razaoSocial;
		this.dataAbertura = dataAbertura;
		this.responsavelComercial = respComercial;
		this.responsavelFinanceiro = respFinanceiro;
		this.produtos = [];
	}

	adicionarProduto(novoProduto: Produto) {
		this.produtos.push(novoProduto);
	}

	adicionarProdutos(novosProdutos: Produto[]) {
		this.produtos = [...this.produtos, ...novosProdutos];
	}
}

export default Loja;
