import { usuarios } from '../../database';
import { Usuario } from '../../models';
import { CadastrarUsuarioDTO } from '../../usecases/Usuarios/cadastrar-usuario.usecase';

export class UsuariosRepository {
	public verificarSeExisteUsuarioPorEmail(email: string): boolean {
		// se existir - true
		// se nao existir - false
		return usuarios.some((usuario) => usuario.toJSON().email === email);
	}

	public cadastrar(dados: CadastrarUsuarioDTO): Usuario {
		const novoUsuario = new Usuario(dados.email, dados.senha);

		usuarios.push(novoUsuario);
		return novoUsuario;
	}
}
