import express from 'express';
import { TransacaoController, UsuariosController } from '../controllers';
import {
	validarDadosUsuario,
	validarEnvioDadosTransacao,
	validarValorETipoTransacao,
} from '../middlewares';

const app = express.Router(); // essa linha adiciona
app.get('/', (req, res) => res.status(200).json({ message: 'OK' }));

// USUARIOS
app.post(
	'/usuarios/cadastro',
	validarDadosUsuario,
	UsuariosController.cadastrar
);
app.post('/usuarios/login', validarDadosUsuario, UsuariosController.logar);

// TRANSAÇÕES
app.post(
	'/usuarios/:idUsuario/transacoes',
	validarEnvioDadosTransacao,
	validarValorETipoTransacao,
	TransacaoController.cadastrar
);
app.get('/usuarios/:idUsuario/transacoes');
app.get('/usuarios/:idUsuario/transacoes/:idTransacao');
app.put('/usuarios/:idUsuario/transacoes/:idTransacao');
app.delete('/usuarios/:idUsuario/transacoes/:idTransacao');

export default app; // essa linha adiciona
