import React from 'react';
import TitleDefault from '../../components/Heading';
import Input from '../../components/Input';
import Container from '../../components/Container/styles';

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

			{/* 

				TO-DO
				1 - Criar uma lista de tarefas (definir types e criar o mock de registros)
				2 - Criar componente do Card
				3 - Renderizar um Card para cada tarefa da lista  

			*/}
		</Container>
	);
};

export default Home;

// main > App > AppRoutes > Home
