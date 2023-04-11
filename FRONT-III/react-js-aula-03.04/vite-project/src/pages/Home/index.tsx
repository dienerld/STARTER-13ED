import React from 'react';
import TitleDefault from '../../components/Heading';
import Input from '../../components/Input';
import Container from '../../components/Container/styles';
import listaTarefas from '../../database';
import Card from '../../components/Card';
import ButtonStyled from '../../components/Button/styles';

const Home: React.FC = () => {
	return (
		<Container display="flex" alignItems="center" flexDirection="column">
			<TitleDefault title="Lista de Tarefas" />
			<Input
				id="task"
				name="tarefa"
				placeholder="Descreva a tarefa..."
				type="text"
			/>

			<ButtonStyled>Adicionar</ButtonStyled>

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
