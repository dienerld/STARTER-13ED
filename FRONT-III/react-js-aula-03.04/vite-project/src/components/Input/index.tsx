import { forwardRef } from 'react';
import CustomInput from './styles';

interface InputProps {
	name: string;
	placeholder: string;
	type: string;
	label?: string;
	showLabel?: boolean;
	id: string;
}

const InputRef = forwardRef<HTMLInputElement>((props, ref) => {
	return (
		<CustomInput
			ref={ref}
			type={'text'}
			placeholder={'Escreva uma tarefa'}
			id={'task'}
			name={'task'}
		/>
	);
});

export default InputRef;

// const [titulo, setTitulo] = useState('Teste'); // array[0, 1] = 'Teste' => valor inicial deste estado
// 	const [usuarios, setUsuarios] = useState<User[]>([{ email: 'joao@teste', password: '123'}, { email: 'maria@teste', password: '1223'}]);
// 	const [usuarioLogado, setUsuarioLogado] = useState<User>({ email: '', password: ''});

// 	const newUser: User = {
// 		email: 'joaquim@teste',
// 		password: '1234'
// 	}
// 	// push, unshift, pop, slice, shift, forEach etc... => todos os métodos de arrays que modificam a lista original não vão funcionar para estados

// 	// ADICIONAR um novo usuario nessa lista

// 	// unshift
// 	setUsuarios( (prevState) => [newUser, ...prevState ]) // copia de um determinado Array ou objeto

// 	// push
// 	setUsuarios( (prevState) => {
// 		return prevState.map((user) => {

// 			if( user.email === 'maria@teste') {
// 				return {
// 					...user,
// 					email: 'paola@teste',
// 				}
// 			}

// 			return user
// 		})
// 	})

// 	// REMOVER um usuario desta lista
// 	const novaLista = usuarios.filter((usuario) => usuario.email !== 'joao@teste')
// 	setUsuarios(novaLista)

// 	// let aux = [...usuarios];
// 	// aux = [];

// 	const changeTitle = (texto: string) => {
// 		// titulo = texto; // isso aqui não funciona para estados
// 		//setTitulo(texto); // unico jeito de trocar o valor da variavel/estado titulo
// 		// console.log(titulo);
// 	}

// 	// document.title = titulo;
