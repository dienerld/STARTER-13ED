import Casa from './classe-casa';

// instancia - objetos
let casa1 = new Casa(3, 2, 20.5, 2);
let casa2 = new Casa(4, 1, 15.6, 2.3, 'Vermelha');
let casa3 = new Casa(2, 2, 12, 2.5);

console.log('ANTES');
console.log('CASA 1', casa1);
console.log('CASA 2', casa2);
console.log('CASA 3', casa3);

// execução dos métodos
casa1.trocarCor('Azul');
casa2.reformarCasa(2, 2, 'Laranja', 20, 2.5);
casa3.fecharJanelas();

console.log('DEPOIS');
console.log('CASA 1', casa1);
console.log('CASA 2', casa2);
console.log('CASA 3', casa3);
