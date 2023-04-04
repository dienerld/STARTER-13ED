import React from 'react'; // biblioteca
import ReactDOM from 'react-dom/client'; // biblioteca
import App from './App'; // componente
import './styles/globalStyles.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
