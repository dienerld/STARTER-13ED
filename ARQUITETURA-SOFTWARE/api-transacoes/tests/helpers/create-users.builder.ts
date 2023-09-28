import { UsuariosRepository } from '../../src/app/features/usuarios/repositories';

export async function createUsers() {
	const repoUsuario = new UsuariosRepository();

	const userData1 = { email: 'any_email@teste.com', senha: 'any_senha' };
	const userData2 = { email: 'any_email2', senha: 'any_senha' };
	const userData3 = { email: 'any_email3', senha: 'any_senha' };

	const user1 = await repoUsuario.cadastrar(userData1);
	const user2 = await repoUsuario.cadastrar(userData2);
	const user3 = await repoUsuario.cadastrar(userData3);

	return [
		{ json: userData1, model: user1 },
		{ json: userData2, model: user2 },
		{ json: userData3, model: user3 },
	];
}
