import express, { Request, Response } from 'express';
import { v4 as gerarId } from 'uuid';
import { usuarios } from './database';
import { Usuario } from './types';

const app = express();

app.use(express.json()); // configurar alguma coisa ou config que o express vai usar nas requisições e respostas

app.use(express.urlencoded({ extended: false })); // %20% => space

app.listen(8080, () => console.log('Servidor iniciado'));

// -----------------------------------------------------------
// COMEÇA A DEFINIÇÃO DAS ROTAS DA APLICAÇÃO/API
app.get('/', (request: Request, response: Response) => {
	return response.json({ message: 'OK' });
});

// USUARIOS
// CADASTRO - POST
app.post('/users', (request: Request, response: Response) => {
	// precisamos dos dados a serem cadastrados
	// Quem irá enviar é o client - body
	const { email, password } = request.body;

	// lógica para cadastrar um novo usuário
	if (!email) {
		return response.status(400).json({
			message: 'É preciso informar o e-mail',
		});
	}

	if (!email.includes('@') || !email.includes('.com')) {
		return response.status(400).json({
			message: 'É preciso informar um e-mail válido',
		});
	}

	if (!password) {
		return response.status(400).json({
			message: 'É preciso informar a password',
		});
	}

	if (password.length < 6) {
		return response.status(400).json({
			message: 'A senha precisa ter no mínimo 6 caracteres',
		});
	}

	// DENTRO DA LISTA DE USUÁRIOS EXISTENTES, NÃO PODE EXISTIR UM USUARIO COM O EMAIL INFORMADO NO BODY
	if (usuarios.some((usuario) => usuario.email === email)) {
		return response.status(400).json({
			message: 'Já existe um usuário cadastrado com esse e-mail',
		});
	}

	// TUDO CERTO PRA CADASTRAR UM NOVO USUÁRIO
	const novoUsuario: Usuario = {
		id: gerarId(),
		email,
		password,
	};
	usuarios.push(novoUsuario);

	return response.json({
		message: 'OK. Criado com sucesso!',
		dados: novoUsuario,
	});
});

// LISTAGEM - GET
app.get('/users', (request: Request, response: Response) => {
	// query params => parametros da query   => ?chave=valor&chave2=valor2&
	// Caso de uso => filtragem da listagem solicitada

	const parametros = request.query;
	const emailBuscado = parametros.email as string;

	if (!emailBuscado) {
		return response.status(200).json({
			message: 'OK. Lista de usuários',
			dados: usuarios,
		});
	}

	const listaFiltrada = usuarios.filter((usuario) =>
		usuario.email.includes(emailBuscado)
	);

	return response.status(200).json({
		message: 'OK. Lista de usuários',
		dados: listaFiltrada,
		parametros: parametros,
	});
});

// TRANSAÇÕES
// CREATE - POST

// LIST AS TRANSAÇÕES DE UM USUARIO ESPECÍFICO - GET

// UPDATE
// DELETE
