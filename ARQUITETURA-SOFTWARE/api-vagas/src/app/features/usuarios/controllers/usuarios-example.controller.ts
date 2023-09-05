import { Request, Response } from 'express';
import { bcrypt, httpHelper, jwt } from '../../../shared/utils';

interface User {
	username: string;
	senha: string;
	tipo: 'admin' | 'recrutador' | 'candidato';
}

const usuarios: User[] = [];

class UsuariosExampleController {
	async cadastrar(req: Request, res: Response) {
		try {
			const { username, senha } = req.body; // senha123

			// REGRA DE NEGOCIO - NÃO REPETIR O USERNAME

			// QUANDO TUDO OK
			const hashSenha = await bcrypt.generateHash(senha);

			const novoUsuario: User = {
				username,
				senha: hashSenha,
				tipo: 'candidato',
			};

			usuarios.push(novoUsuario);

			return httpHelper.success(res, novoUsuario, 'Usuario cadastrado!', 201);
		} catch (error: any) {
			return httpHelper.serverError(res, error.toString());
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { username, senha } = req.body;

			// encontrar o username
			const userFound = usuarios.find((u) => u.username === username);

			if (!userFound) {
				return httpHelper.badRequestError(res, 'Usuario não encontrado', 401);
			}

			const senhaCorreta = await bcrypt.compareHash(senha, userFound.senha);

			if (!senhaCorreta) {
				return httpHelper.badRequestError(res, 'Username ou senha incorretos!', 401);
			}

			const token = jwt.encoded(userFound);

			return httpHelper.success(res, token, 'Usuario autorizado!');
		} catch (error: any) {
			return httpHelper.serverError(res, error.toString());
		}
	}

	async exemploRotaPrivada(req: Request, res: Response) {
		try {
			const { token } = req.headers;

			if (!token) {
				return httpHelper.badRequestError(
					res,
					'Rota privada. Você precisa informar o token de autenticação.',
					401
				);
			}

			const usuario = jwt.decoded(token as string);

			if (usuario.tipo !== 'admin') {
				return httpHelper.badRequestError(res, 'Somente admin pode acessar essa rota', 401);
			}

			return httpHelper.success(res, { usuario }, 'Info Top Secret 👀');
		} catch (error: any) {
			return httpHelper.serverError(res, error.toString());
		}
	}
}

export const controller = new UsuariosExampleController();
