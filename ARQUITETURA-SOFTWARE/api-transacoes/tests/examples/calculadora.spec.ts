class Calculadora {
	public somar(num1: number, num2: number): number {
		return num1 + num2;
	}

	public multiplicar(num1: number, num2: number): number {
		return num1 * num2;
	}

	public dividir(num1: number, num2: number): number {
		if (num2 === 0) {
			throw new Error('Não é possivel dividir por zero');
		}

		return num1 / num2;
	}
}

// ARGUMENTO 1 - nome do modulo/unidade que será testado
// ARGUMENTO 2 - callbackfn com os testes
describe('Testes do módulo/classe/unidade calculadora', () => {
	// SUT - system under testing
	function createSut() {
		return new Calculadora();
	}

	test('deve retornar 2 ao chamar o metodo somar enviando 1 e 1', () => {
		const sut = createSut();

		// CONSTRUIR O DADO
		const resultado = sut.somar(1, 1);

		// testar com os assets
		expect(resultado).toBe(2);
	});

	test('Não deve retornar 45 ao chamar o metodo multiplicar enviando 6 e 7', () => {
		const sut = createSut();
		const resultado = sut.multiplicar(6, 7);
		expect(resultado).not.toBe(45);
		expect(resultado).toBe(42);
	});
	test('Deve estourar uma exceção se chamar o metodo dividir passando 10 e 0', () => {
		const sut = createSut();
		expect(() => sut.dividir(10, 0)).toThrow(Error);
		// try {
		// 	const sut = createSut();
		// 	sut.dividir(10, 0);
		// } catch (error) {
		// 	expect(error).toBeInstanceOf(Error);
		// }
	});
	test('Deve retornar 2 se chamar o metodo dividir passando 10 e 5', () => {
		const sut = createSut();
		const result = sut.dividir(10, 5);
		expect(() => sut.dividir(10, 2)).not.toThrow(Error);
		expect(result).toBe(2);
	});
});
