import { validate } from "bycontract";
import { Sala, Engine } from "./BaseJogo.js";
import { ChaveDeFenda, Cartao, Chip, Bateria, Martelo } from "./Ferramentas.js";
import { Registro, Foguete, SistemaDePropulsao, PainelDeControleDanificado } from "./Objetos.js";

// Classe que representa o Modulo de Controle
export class ModuloDeControle extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("ModuloControle", engine);

		// Criação da chave de fenda
		let chaveFenda = new ChaveDeFenda();
		this.ferramentas.set(chaveFenda.nome, chaveFenda);

		// Criação do cartão de acesso
		let cartao = new Cartao();
		this.ferramentas.set(cartao.nome, cartao);

		// Objeto painel de controle danificado
		let painelDeControle = new PainelDeControleDanificado();
		this.objetos.set(painelDeControle.nome, painelDeControle);

	}

	// Interação com ferramentas e objetos
	usa(ferramenta, objeto) {
		validate(arguments, ["String", "String"]);

		// Verifica se a ferramenta está no inventário
		if (!this.engine.mochila.tem(ferramenta)) {
			return false;
		}

		// Verifica se o objeto existe na sala
		if (!this.objetos.has(objeto)) {
			return false;
		}

		let obj = this.objetos.get(objeto);

		// Se o objeto for o painel de controle danificado
		if (obj instanceof PainelDeControleDanificado) {
			// Verifica se o jogador possui o Chip de Controle no inventário
			if (this.engine.mochila.tem("chip de controle")) {
				// Verifica se a ferramenta usada é a chave de fenda
				if (ferramenta === "chave de fenda") {
					return obj.reparar(this.engine.mochila.pega(ferramenta));
				}
			} else {
				console.log("Você precisa do Chip de Controle para reparar o painel.");
				return false;
			}
		}

		return false;
	}
}

// Classe que representa o Laboratorio
export class LaboratorioDePesquisa extends Sala {
	constructor(engine) {
		super("Laboratorio", engine);

		// Criação do chip
		let chip = new Chip(); 
		this.ferramentas.set(chip.nome, chip);

		// Criação do registro
		let registro = new Registro(); 
		this.objetos.set(registro.nome, registro);
	}


	// Método que facilita o movimento entre as salas
	sai(porta) {
		if (this.portas.has(porta)) {
			return this.portas.get(porta);
		}
		return null;
	}
}

// Classe que representa o Hangar de Fuga
export class HangarDeFuga extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("Hangar", engine);

		// Criação do Foguete
		let foguete = new Foguete();
		this.objetos.set(foguete.nome, foguete);

		// Criação da bateria
		let bateria = new Bateria(); // Criação do chip
		this.ferramentas.set(bateria.nome, bateria);
	}
}

// Classe que representa a sala de Motores
export class SalaDeMotores extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("Motores", engine);

		// Criação do Sistema de Propulsão danificado
		let sistemaDePropulsao = new SistemaDePropulsao();
		this.objetos.set(sistemaDePropulsao.nome, sistemaDePropulsao);

		// Criação do Martelo
		let martelo = new Martelo();
		this.ferramentas.set(martelo.nome, martelo);
	}
}


