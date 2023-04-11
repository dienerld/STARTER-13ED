import { DefaultTheme } from 'styled-components';

const light: DefaultTheme = {
	colors: {
		bgColor: '#fff',
		main: 'red',
		secondary: 'orange',
		textColor: '#3a3a3a',
	},
};

const dark: DefaultTheme = {
	colors: {
		bgColor: '#3a3a3a',
		main: 'blue',
		secondary: 'green',
		textColor: '#fff',
	},
};

export { light, dark };
