import React from 'react';
import CustomInput from './styles';

interface InputProps {
	name: string;
	placeholder: string;
	type: string;
	label?: string;
	showLabel?: boolean;
	id: string;
	valor: string;
	handleChange: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({label,name,placeholder,type,id,showLabel, valor, handleChange}) => {
	
	
	return (
		<>
			{/* {showLabel && ( */}
			<label htmlFor={id}>
				{valor}
			</label>
			{/* )} */}
			<CustomInput
				type={type}
				placeholder={placeholder}
				id={id}
				name={name}
				value={valor}
				onChange={(ev) => handleChange(ev.target.value)}
			/>
		</>
	);
};

export default Input;

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
