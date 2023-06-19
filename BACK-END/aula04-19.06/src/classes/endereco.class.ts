import { v4 as randomUUID } from 'uuid';

// DTO - {}
type NovoEndereco = {
	logradouro: string;
	numero: string;
	cep: string;
	bairro: string;
	cidade: string;
	uf: string;
};

type AtualizarEndereco = Partial<NovoEndereco>;

class Endereco {
	private _id: string;
	private _logradouro: string;
	private _numero: string;
	private _cep: string;
	private _bairro: string;
	private _cidade: string;
	private _uf: string;

	constructor(dadosEndereco: NovoEndereco) {
		this._id = randomUUID();
		this._logradouro = dadosEndereco.logradouro;
		this._numero = dadosEndereco.numero;
		this._cep = dadosEndereco.cep;
		this._bairro = dadosEndereco.bairro;
		this._cidade = dadosEndereco.cidade;
		this._uf = dadosEndereco.uf;
	}

	public atualizarDados(dados: AtualizarEndereco) {
		this._logradouro = dados.logradouro ?? this._logradouro;
		this._numero = dados.numero ?? this._logradouro;
		this._numero = dados.cep ?? this._cep;
		this._bairro = dados.bairro ?? this._bairro;
		this._cidade = dados.cidade ?? this._cidade;
		this._uf = dados.uf ?? this._uf;
	}

	public get logradouro(): string {
		return this._logradouro;
	}

	public get numero(): string {
		return this._numero;
	}

	public get cep(): string {
		return this._cep;
	}

	public get bairro(): string {
		return this._bairro;
	}

	public get cidade(): string {
		return this._cidade;
	}

	public get uf(): string {
		return this._uf;
	}
}

export default Endereco;
