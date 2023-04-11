import React from 'react';
import { Tarefa } from '../../types';
import CardStyled from './styles';

const Card: React.FC<Tarefa> = ({ id, titulo, criadoEm }) => {
	// lógica

	return (
		<CardStyled>
			<strong>{titulo}</strong>
			<small>{criadoEm}</small>
		</CardStyled>
	);
};

export default Card;
