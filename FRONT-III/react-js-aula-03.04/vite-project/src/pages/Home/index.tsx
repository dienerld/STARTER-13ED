import React, { useState } from 'react';
import ButtonStyled from '../../components/Button/styles';
import Card from '../../components/Card';
import Container from '../../components/Container/styles';
import TitleDefault from '../../components/Heading';
import Input from '../../components/Input';
import { Tarefa } from '../../types';
import { gerarData, gerarId } from '../../utils/geradorData';
// import listaTarefas from '../../database';

const Home: React.FC = () => {
	// estados de um componente
	const [titulo, setTitulo] = useState('');
	const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);

	// 1 - se uma função não precisa de parametros, dai chama no evento sem a necessidade da arrow function e abre e fecha parenteses da função

	// 2- Sempre que tiver parametros a rotina/função a gente monta uma () => que aponta para execução desta rotina
	const addNewCard = () => {
		const novaTarefa: Tarefa = {
			id: gerarId(),
			titulo: titulo,
			criadoEm: gerarData(),
		}

		setListaTarefas( (prevState) => [novaTarefa, ...prevState])
		setTitulo('')
	}


	return (
		<Container display="flex" alignItems="center" flexDirection="column">
			<TitleDefault title="Lista de Tarefas" />
			<Input
				valor={titulo}
				handleChange={setTitulo}
				id="task"
				name="tarefa"
				placeholder="Descreva a tarefa..."
				type="text"
				
			/>

			<ButtonStyled onClick={addNewCard}>Adicionar</ButtonStyled>

			{/* 

				TO-DO
				1 - Criar uma lista de tarefas (definir types e criar o mock de registros) OK
				2 - Criar componente do Card - OK
				3 - Renderizar um Card para cada tarefa da lista - OK
				4 - Criar o Componente Button do App - OK

			*/}

			{listaTarefas.map(({ id, criadoEm, titulo }) => {
				return (
					<Card
						key={id}
						id={id}
						titulo={titulo}
						criadoEm={criadoEm}
					/>
				);
			})}
		</Container>
	);
};

export default Home;

// main > App > AppRoutes > Home
