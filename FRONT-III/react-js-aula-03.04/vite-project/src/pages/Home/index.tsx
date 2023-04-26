import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Link } from 'react-router-dom';
import ButtonStyled from '../../components/Button/styles';
import Card from '../../components/Card';
import Container from '../../components/Container/styles';
import Title from '../../components/Heading';
import Input from '../../components/Input';
import { Tarefa } from '../../types';
import { gerarData, gerarId } from '../../utils/geradorData';
// import listaTarefas from '../../database';

const Home: React.FC = () => {
	// estados de um componente
	// const [titulo, setTitulo] = useState('');
	const inputRef = useRef<null | HTMLInputElement>(null);
	const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);
	const [counter, setCounter] = useState(0);

	// 1 - quando o componente monta
	useEffect(() => {
		setListaTarefas(JSON.parse(localStorage.getItem('tarefas') ?? '[]'));
		console.log('executou o render 1 vez');

		// 3 - quando o componente desmonta
		return () => {
			localStorage.removeItem('usuarioLogado');
		};
	}, []);

	// 2 - quando o componente atualiza - re-renderizou
	useEffect(() => {
		localStorage.setItem('tarefas', JSON.stringify(listaTarefas));
		console.log('LISTA TAREFAS ATUALIZOU - componente renderou novamente');
	}, [listaTarefas]);

	// 2 - quando o componente atualiza - re-renderizou
	useEffect(() => {
		if (inputRef.current && inputRef.current?.value.length < 5) {
			console.log('tem menos que 5 caracteres');
		}
	}, [inputRef.current]);

	// 4 - toda e qualquer alteração que tiver - SEMPRE
	useEffect(() => {
		console.log('SEM DEPENDENCIAS');

		handleCounterA();
	});

	// const TitleMemo = useMemo(() => {
	// 	return <TitleDefault title='Lista de Tarefas' />;
	// }, []);

	// 1 - se uma função não precisa de parametros, dai chama no evento sem a necessidade da arrow function e abre e fecha parenteses da função

	// 2- Sempre que tiver parametros a rotina/função a gente monta uma () => que aponta para execução desta rotina
	const addNewCard = () => {
		if (inputRef.current) {
			const novaTarefa: Tarefa = {
				id: gerarId(),
				titulo: inputRef.current.value,
				criadoEm: gerarData(),
			};

			setListaTarefas((prevState) => [novaTarefa, ...prevState]);
		}
	};

	const listaMemo = useMemo(() => {
		return listaTarefas.map(({ id, criadoEm, titulo }) => {
			return (
				<Card
					key={id}
					id={id}
					titulo={titulo}
					criadoEm={criadoEm}
				/>
			);
		});
	}, [listaTarefas]);

	const handleCounterA = useCallback(() => {
		setCounter(
			listaTarefas.filter((tarefa) => tarefa.titulo.includes('a')).length
		);
	}, [listaTarefas]);

	return (
		<Container
			display='flex'
			alignItems='center'
			flexDirection='column'
		>
			<Title title='Lista de Tarefas' />
			<Input ref={inputRef} />

			<ButtonStyled onClick={addNewCard}>Adicionar</ButtonStyled>

			{listaMemo}
			<Link
				to='/signin'
				style={{ color: 'white' }}
			>
				Logout
			</Link>

			<h4>{counter}</h4>
		</Container>
	);
};

export default Home;

// main > App > AppRoutes > Home
