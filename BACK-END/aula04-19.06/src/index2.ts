// CALLBACK

// ASSINCRONO - pedir para quem recebe os retornos das funções aguarda
// 4 - W - aguarda
// 2 - R - aguarda
// 3 - O - aguarda
// 1 - G - aguarda

// 10s => resultado => callback => GROW

// SINCRONO - o envio dos dados deve ser realizado na ordem necessaria de recebimento
//  G - callback => G
//  R - callback => GR
//  O - callback => GRO
//  W - callback => GROW

// addEventListener() - FRONT
// h1.addEventListener()

// API - BACK
// app.get('/users', () => {});

setTimeout(() => {
	// aqui dentro é resolvido depois dos 6000ms
	console.log('TERCEIRO DEFINIDO');
}, 6000);

// PROCESSAMENTO NÃO BLOQUEANTE - EVENT LOOP
setTimeout(() => {
	// aqui dentro é resolvido depois dos 5000ms
	console.log('PRIMEIRO DEFINIDO');
}, 5000);

setTimeout(() => {
	// aqui dentro é resolvido depois dos 3000ms
	console.log('SEGUNDO DEFINIDO');
}, 3000);

console.log('NÃO DEFINIDO');

// QUAL A ORDEM EM QUE OS LOGS ACIMA SERÃO MOSTRADOS?

//..
//..
//..
