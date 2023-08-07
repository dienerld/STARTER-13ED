import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { UsuariosController } from './controllers';
import { validarDadosUsuario } from './middlewares';

const app = express();

// config de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.PORT, () =>
	console.log(`Servidor rodando na porta ${process.env.PORT} 🚀`)
);

app.get('/', (req, res) => res.status(200).json({ message: 'OK' }));

// USUARIOS
// cadastrar
app.post('/usuarios', validarDadosUsuario, UsuariosController.cadastrar);
// logar
