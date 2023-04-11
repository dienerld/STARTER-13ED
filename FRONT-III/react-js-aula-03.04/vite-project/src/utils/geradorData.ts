function gerarData() {
	const data = new Date(); // aaaa-mm-dd UTC03:00 19:45:00

	return data.toLocaleDateString('pt-br', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}); // dd/mm/aaaa, 07:45:00
}

export default gerarData;
