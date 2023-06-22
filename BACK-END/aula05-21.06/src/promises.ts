import axios, { AxiosError } from 'axios';
/*

	PROMISES - ASYNC FUNCTIONS
		- pending: ainda está sendo processada
		- fulfilled: já possui o resultado do processamento
		- reject: rejeitada por inconsistencia na solicitação

*/

// ASSINCRONO COM THEN E CATCH
mostrarDadosApiAntigo();

// ASSINCRONO COM ASYNC AWAIT
mostrarDadosApi();

let users = [];

// ISSO É EXECUTADO EM TEMPO REAL - SINCRONO
console.log(mostrarDados());
console.log('alguma outra coisa');

function mostrarDados() {
	const user = [
		{
			id: 1,
			nome: 'Maria',
			telefone: '(51) 99988-7777',
		},
		{
			id: 2,
			nome: 'João',
			telefone: '(51) 99988-7766',
		},
	];

	return user;
}

function adicionarUsuarios(lista: any) {
	users = lista;

	console.log('THEN E CATCH ', users);
}

// antigo
function mostrarDadosApiAntigo() {
	axios
		.get('https://jsonplaceholder.typicode.com/users')
		.then((resposta) => {
			// estado fullfiled
			// PIPE - funil
			const dadoManipulado = resposta.data.map((user: any) => {
				return {
					id: user.id,
					nome: user.name,
					email: user.email,
				};
			});

			return dadoManipulado;
		})
		.then((dadoManipulado) => {
			// EXECUTA DEPOIS DO PRIMEIRO THEN
			return dadoManipulado.filter((user: any) =>
				user.nome.startsWith('C')
			);
		})
		.then((data) => {
			// armazenar no banco
			adicionarUsuarios(data);
		})
		.catch((error) => {
			// estado rejected
			if (error instanceof SyntaxError) {
				console.log('Errei a sintaxe em algum momento');
			} else if (error instanceof TypeError) {
				console.log(
					'Errei a manipulação do dado com a tipagem errada em algum momento'
				);
			} else if (error instanceof ReferenceError) {
				console.log(
					'Tentei acessar uma variavel sem defini-la ou antes de ser definida'
				);
			} else if (error instanceof AxiosError) {
				console.log('Erro de requisição');
			} else {
				console.log('DEU RUIM');
			}
		});

	// then() - fullfiled - aqui vai cair quando a requisição já tiver sido processada
	// catch() - reject - aqui vai cair sempre que uma requisição for rejeitada
	// CALLBACK FUNCTIONS -
}

// ASYNC AWAIT
async function mostrarDadosApi() {
	// AGUARDAR O RESULTADO DE UMA PROMISE
	try {
		const resposta = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);

		const usuarios = resposta.data
			.map((user: any) => {
				return {
					id: user.id,
					nome: user.name,
					email: user.email,
				};
			})
			.filter((user: any) => user.nome.startsWith('C'));

		return usuarios;
	} catch (error) {
		// estado rejected
		if (error instanceof SyntaxError) {
			console.log('Errei a sintaxe em algum momento');
		} else if (error instanceof TypeError) {
			console.log(
				'Errei a manipulação do dado com a tipagem errada em algum momento'
			);
		} else if (error instanceof ReferenceError) {
			console.log(
				'Tentei acessar uma variavel sem defini-la ou antes de ser definida'
			);
		} else if (error instanceof AxiosError) {
			// 400 ... 500
			console.log('Erro de requisição');
		} else {
			console.log('DEU RUIM');
		}
	}
}
