import Gerente from './gerente.class';
import Loja from './loja.class';
import Produto from './produtos.class';

const gerenteComercial = new Gerente(100, 'Joao', '111', 5000);
const gerenteFinanceiro = new Gerente(500, 'Maria', '222', 6000);

// COMPOSIÇÃO !== HERANÇA
// composição - uma classe depende da instancia de outra(s) classes para ser construida
// compor
const lojaSete = new Loja(
	'Loja Sete',
	gerenteComercial,
	gerenteFinanceiro,
	new Date('2023-06-05')
);

const produtoCamisa = new Produto('1', 'Camisa Preta', 50);
const produtoCalca = new Produto('2', 'Calca Preta', 100);
const produtoTenis = new Produto('2', 'Tenis Preta', 200);

lojaSete.adicionarProduto(produtoCamisa);
lojaSete.adicionarProdutos([produtoTenis, produtoCalca]);

// const gerenteLoja1 = new Gerente(500, 'João da Silva', '000.111.222-33', 5000);

// gerenteLoja1.mostrarDados();
// // gerenteLoja1.atualizarDados();
// // gerenteLoja1.adicionalSalario();
// gerenteLoja1.toJson();
