import cors from 'cors';
import express, { Request, Response } from 'express';
import { v4 as gerarId } from 'uuid';
import { transacoes, usuarios } from './database';
import { Transacao, Usuario } from './types';

const app = express();

app.use(express.json()); // configurar alguma coisa ou config que o express vai usar nas requisições e respostas

// LIBERAR AS REQUISIÇÕES DE QUALQUER FRONT END
app.use(cors());

app.use(express.urlencoded({ extended: false })); // %20% => space

app.listen(8080, () => console.log('Servidor iniciado'));

// -----------------------------------------------------------
// COMEÇA A DEFINIÇÃO DAS ROTAS DA APLICAÇÃO/API
app.get('/', (request: Request, response: Response) => {
	return response.json({ message: 'OK' });
});

// -------------------------------------------------------------------------------
// USUARIOS
// CADASTRO - POST
app.post('/usuarios/cadastro', (request: Request, response: Response) => {
	// precisamos dos dados a serem cadastrados
	// Quem irá enviar é o client - body
	const { email, senha } = request.body;

	// lógica para cadastrar um novo usuário
	if (!email) {
		return response.status(400).json({
			mensagem: 'É preciso informar o e-mail',
		});
	}

	if (!email.includes('@') || !email.includes('.com')) {
		return response.status(400).json({
			mensagem: 'É preciso informar um e-mail válido',
		});
	}

	if (!senha) {
		return response.status(400).json({
			mensagem: 'É preciso informar a senha',
		});
	}

	if (senha.length < 6) {
		return response.status(400).json({
			mensagem: 'A senha precisa ter no mínimo 6 caracteres',
		});
	}

	// DENTRO DA LISTA DE USUÁRIOS EXISTENTES, NÃO PODE EXISTIR UM USUARIO COM O EMAIL INFORMADO NO BODY
	if (usuarios.some((usuario) => usuario.email === email)) {
		return response.status(400).json({
			mensagem: 'Já existe um usuário cadastrado com esse e-mail',
		});
	}

	// TUDO CERTO PRA CADASTRAR UM NOVO USUÁRIO
	const novoUsuario: Usuario = {
		email,
		password: senha,
	};
	usuarios.push(novoUsuario);

	return response.json({
		mensagem: 'OK. Criado com sucesso!',
		dados: novoUsuario,
	});
});

// LISTAGEM - GET
app.get('/usuarios', (request: Request, response: Response) => {
	// query params => parametros da query   => ?chave=valor&chave2=valor2&
	// Caso de uso => filtragem da listagem solicitada

	// axios - client HTTP
	// axios.get('/usuarios', { params: { nome: 'Joao', email: 'joao@teste'}});

	const parametros = request.query;
	const emailBuscado = parametros.email as string;

	if (!emailBuscado) {
		return response.status(200).json({
			mensagem: 'OK. Lista de usuários',
			dados: usuarios,
		});
	}

	const listaFiltrada = usuarios.filter((usuario) =>
		usuario.email.includes(emailBuscado)
	);

	return response.status(200).json({
		mensagem: 'OK. Lista de usuários',
		dados: listaFiltrada,
		parametros: parametros,
	});
});

// LOGIN - POST
app.post('/usuarios/login', (request: Request, response: Response) => {
	// precisamos dos dados para o login ser feito
	// Quem irá enviar é o client - body
	const { email, senha } = request.body;

	// lógica para logar um usuário
	if (!email) {
		return response.status(400).json({
			mensagem: 'É preciso informar o e-mail',
		});
	}

	if (!email.includes('@') || !email.includes('.com')) {
		return response.status(400).json({
			mensagem: 'É preciso informar um e-mail válido',
		});
	}

	if (!senha) {
		return response.status(400).json({
			mensagem: 'É preciso informar a senha',
		});
	}

	// DENTRO DA LISTA DE USUÁRIOS EXISTENTES, DEVE EXISTIR UM USUARIO COM O EMAIL E SENHA INFORMADOS NO BODY
	const usuarioEncontrado = usuarios.find(
		(usuario) => usuario.email === email && usuario.password === senha
	);

	if (!usuarioEncontrado) {
		return response.status(404).json({
			mensagem:
				'E-mail ou senha inválidos. Conta de usuário não encontrada.',
		});
	}

	return response.json({
		mensagem: 'OK. Login efetuado com sucesso!',
		usuarioAutorizado: usuarioEncontrado.email,
	});
});

// -------------------------------------------------------------------------------
// TRANSAÇÕES
// CRIAR - POST
app.post(
	'/usuarios/:emailUsuario/transacoes/criar',
	(request: Request, response: Response) => {
		// ROUTE PARAMS - ele é obrigatório
		// transação vai/deve ser criada para o usuario que possui o email informado na rota
		const { emailUsuario } = request.params;
		const { type, description, value } = request.body;

		//validar se existe um usuário com o email informado na rota
		if (!usuarios.some((usuario) => usuario.email === emailUsuario)) {
			return response.status(404).json({
				mensagem: `Nenhum usuário encontrado com o e-mail ${emailUsuario}`,
			});
		}

		// daqui pra baixo é validar os dados enviados para cadastro da transação
		/*
			type: 'income' | 'outcome';
			description: string;
			value: number;
		*/
		if (!type || (type !== 'income' && type !== 'outcome')) {
			return response.status(400).json({
				mensagem:
					'É necessário informar o tipo da transação. Envie "income" para entradas, ou "outcome" para saídas.',
			});
		}

		if (!description || !description.length) {
			// 0 => false
			return response.status(400).json({
				mensagem: 'É necessário informar a descrição da transação.',
			});
		}

		if (!value || typeof value !== 'number') {
			return response.status(400).json({
				mensagem:
					'É necessário informar o valor da transação em formato numérico',
			});
		}

		// TA TUDO OK PRA GENTE CADASTRAR A TRANSAÇÃO
		const novaTransacao: Transacao = {
			id: gerarId(),
			description,
			value,
			type,
			createdAt: new Date().toISOString().split('T')[0], // YYYY-mm-dd
			createdBy: emailUsuario,
		};

		transacoes.push(novaTransacao);

		return response.json({
			mensagem: 'Transação cadastrada com sucesso!',
			dados: novaTransacao,
		});
	}
);

// LISTAR AS TRANSAÇÕES DE UM USUARIO ESPECÍFICO - GET
// ROUTE PARAMS
app.get(
	'/usuarios/:emailUsuario/transacoes/listar',
	(request: Request, response: Response) => {
		const { emailUsuario } = request.params;

		//validar se existe um usuário com o email informado na rota
		if (!usuarios.some((usuario) => usuario.email === emailUsuario)) {
			return response.status(404).json({
				mensagem: `Nenhum usuário encontrado com o e-mail ${emailUsuario}`,
			});
		}

		const listaFiltrada = transacoes.filter(
			(transacao) => transacao.createdBy === emailUsuario
		);

		return response.status(200).json({
			mensagem: `Transações do usuário ${emailUsuario} listadas com sucesso!`,
			dados: listaFiltrada,
		});
	}
);

// UPDATE
// ROUTE PARAMS
app.put(
	'/usuarios/:emailUsuario/transacoes/atualizar/:idTransacao',
	(request: Request, response: Response) => {
		const { emailUsuario, idTransacao } = request.params;
		const { type, description, value } = request.body;

		//validar se existe um usuário com o email informado na rota
		if (!usuarios.some((usuario) => usuario.email === emailUsuario)) {
			return response.status(404).json({
				mensagem: `Nenhum usuário encontrado com o e-mail ${emailUsuario}`,
			});
		}

		// validar se o id da transação informado existe
		const indiceEncontrado = transacoes.findIndex(
			(transacao) => transacao.id === idTransacao
		);

		if (indiceEncontrado < 0) {
			return response.status(404).json({
				mensagem: `Nenhuma transação encontrada com o id ${idTransacao}.`,
			});
		}

		if (type && type !== 'income' && type !== 'outcome') {
			return response.status(400).json({
				mensagem:
					'Formato do tipo da transação inválido. Informe "income" ou "outcome"',
			});
		}

		if (description && !description?.length) {
			// 0 => false
			return response.status(400).json({
				mensagem:
					'É necessário preencher o campo descrição com ao menos um caracter para atualizar seu valor.',
			});
		}

		// ""
		// "abc"
		// undefined
		// Number()  => 0 =>  false NaN
		const valorParse = Number(value);

		if (isNaN(valorParse) || !valorParse) {
			return response.status(400).json({
				mensagem:
					'É necessário informar o valor da transação em formato numérico.',
			});
		}

		// O QUE VAI SER LIBERADO PARA ATUALIZAÇÃO DA TRANSAÇÃO?
		const transacaoAntiga = transacoes[indiceEncontrado];

		transacoes[indiceEncontrado] = {
			...transacaoAntiga,
			value: valorParse || transacaoAntiga.value, // ?? => só testa undefined ou null
			description: description || transacaoAntiga.description,
			type: type || transacaoAntiga.type,
		};

		return response.status(200).json({
			mensagem: 'Transação atualizada com sucesso!',
			itemAtualizado: transacoes[indiceEncontrado],
		});
	}
);

// DELETE
// ROUTE PARAMS
app.delete(
	'/usuarios/:emailUsuario/transacoes/deletar/:idTransacao',
	(request: Request, response: Response) => {
		const { emailUsuario, idTransacao } = request.params;

		//validar se existe um usuário com o email informado na rota
		if (!usuarios.some((usuario) => usuario.email === emailUsuario)) {
			return response.status(404).json({
				mensagem: `Nenhum usuário encontrado com o e-mail ${emailUsuario}`,
			});
		}

		// validar se o id da transação informado existe
		const indiceEncontrado = transacoes.findIndex(
			(transacao) =>
				transacao.createdBy === emailUsuario &&
				transacao.id === idTransacao
		);

		if (indiceEncontrado < 0) {
			return response.status(404).json({
				mensagem: `Nenhuma transação encontrada com o id ${idTransacao}.`,
			});
		}

		const [dadoExcluido] = transacoes.splice(indiceEncontrado, 1);

		return response.status(200).json({
			mensagem: 'Transação excluida com sucesso!',
			itemRemovido: dadoExcluido,
		});
	}
);
