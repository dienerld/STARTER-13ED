import React from 'react';
import TitleDefault from '../../components/TitleDefault';
import Input from '../../components/Input';
import Container from '../../components/Container';

const Home: React.FC = () => {
	return (
		<Container display="flex" alignItems="center" flexDirection="column">
			<TitleDefault title="Home" />
			<Input
				showLabel
				id="name"
				label="Nome"
				name="name"
				placeholder="Digite seu nome..."
				type="text"
			/>
			<Input
				id="email"
				name="email"
				placeholder="Digite seu email..."
				type="email"
			/>
		</Container>
	);
};

export default Home;

// main > App > AppRoutes > Home
