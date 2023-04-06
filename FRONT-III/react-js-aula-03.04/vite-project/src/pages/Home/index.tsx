import React from 'react';
import TitleDefault from '../../components/Heading';
import Input from '../../components/Input';
import Container from '../../components/Container';

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
		</Container>
	);
};

export default Home;

// main > App > AppRoutes > Home
