import { Objeto, Ferramenta } from "./BaseJogo.js";
import { ChaveDeFenda, Martelo } from "./Ferramentas.js";

// Classe que representa um painel de controle danificado
export class PainelDeControleDanificado extends Objeto {
	constructor() {
		super("painel de controle"); // Chama o construtor da classe base com o nome do objeto

		this.reparado = false;
		this.descricaoErro = "O painel de controle está danificado e precisa ser reparado."; 
		this.descricaoOk = "O painel de controle está funcionando corretamente."; 
	}

	// Retorna a descrição do painel dependendo do seu estado (danificado ou reparado)
	get descricao() {
		return this.reparado ? this.descricaoOk : this.descricaoErro;
	}

	// Método para reparar o painel com a ferramenta adequada
	reparar(ferramenta) {
		if (this.reparado) {
			return false; // Se já estiver reparado, não faz nada
		}

		if (ferramenta instanceof ChaveDeFenda) {
			this.reparado = true;
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}

// Classe que representa os Registros da estação
export class Registro extends Objeto {
	constructor() {
		super(
			"registros", 
			"Um relatório com detalhes sobre a explosão na estação",
			"Os registros foram lidos. Contêm informações cruciais."
		);
	}

	ler() {
		console.log("Lendo os registros da explosão...");
		console.log("-------------------------------------------------");
		console.log("A explosão danificou vários sistemas essenciais da estação, incluindo o painel de controle principal.");
		console.log("O painel de controle foi severamente comprometido e precisa de um chip de controle reserva para ser reparado.");
		console.log("Este chip de controle reserva pode ser encontrado na Sala do Laboratório.");
		console.log("Sem o reparo do painel, a nave não poderá decolar, e a estação estará em risco de destruição completa.");
		console.log("Além disso, recomenda-se que todos os sistemas de segurança sejam verificadas para evitar falhas adicionais.");
		console.log("-------------------------------------------------");
		console.log("O relatório contém mais informações detalhadas sobre o estado da estação e os esforços de reparo.");
		console.log("Esses dados podem ser úteis para o progresso do seu objetivo.");
	}

}

// Classe que representa o foguete danificado
export class Foguete extends Objeto {
	constructor() {
		super("foguete",
			"A bateria do foguete está danificada e precisa ser trocada.\n (Ferrramentas necessárias: bateria reserva e chave de fenda)",
			"O foguete teve a sua bateria trocada e está funcionando perfeitamente."
		);

		this.reparado = false; // Indica se o foguete já foi reparado
		this.descricaoErro = "Foguete continua com danificado!";
		this.descricaoOk = "Foguete operando!";
	}

	// Método para colocar a bateria no foguete
	reparar(ferramenta) {
		if (this.reparado) {
			return false; // Se já estiver reparado, não faz nada
		}

		// Esta funcionando com instanceof da Chave mas com o da bateria nao, deixei assim até uma solução
		if (ferramenta instanceof ChaveDeFenda) {
			this.reparado = true; // Marca o foguete como reparado
			this.acaoOk = true; // Atualiza o estado da ação
			return true; 
		}
		return false; // Retorna falso se a ferramenta não for adequada
	}
}

// Classe que representa o sistema de propulsao danificado
export class SistemaDePropulsao extends Objeto {
	constructor() {
		super("sistema de propulsao",
			" O sistema de propulsao está danificado e precisa ser reparado.",
			" O sistema de propulsao foi reparado e está funcionando corretamente."
		);

		this.reparado = false;
		this.descricaoErro = " O sistema de propulsao ainda está danificado.";
		this.descricaoOk = " Sistema de propulsao funcionando em 80%.";
	}

	// Método para reparar o sistema de propulsão
	reparar(ferramenta) {
		if (this.reparado) {
			return false; // Se já estiver reparado, não faz nada
		}

		if (ferramenta instanceof Martelo) {
			this.reparado = true; // Marca como reparado
			this.acaoOk = true; // Atualiza o estado da ação
			return true;
		}
		return false; // Retorna falso se a ferramenta não for adequada
	}
}
