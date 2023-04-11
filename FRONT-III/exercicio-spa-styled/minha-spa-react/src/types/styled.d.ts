import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			bgColor: string;
			main: string;
			secondary: string;
			textColor: string;
		};
	}
}
