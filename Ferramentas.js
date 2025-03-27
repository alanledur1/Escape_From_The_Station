import { Ferramenta } from './BaseJogo.js';  // Importa a classe Ferramenta de Basicas.js

export class ChaveDeFenda extends Ferramenta {
    constructor() {
        super("chave");
    }
}

export class Martelo extends Ferramenta {
	constructor() {
			super("martelo");
	}
}

export class Cartao extends Ferramenta{
	constructor() {
		super("cartao");
	}
}

export class Chip extends Ferramenta{
	constructor() {
		super("chip");
	}
}

export class Bateria extends Ferramenta{
	constructor() {
		super("bateria");
	}
}


