import Gerente from './gerente.class';

const gerenteLoja1 = new Gerente(500, 'João da Silva', '000.111.222-33', 5000);

gerenteLoja1.mostrarDados();
// gerenteLoja1.atualizarDados();
// gerenteLoja1.adicionalSalario();
gerenteLoja1.toJson();
