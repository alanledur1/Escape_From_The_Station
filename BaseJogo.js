import { validate } from "bycontract";
import promptsync from 'prompt-sync';
const prompt = promptsync({ sigint: true });

// ---------------------------------------------
export class Ferramenta {
	#nome;

	constructor(nome) {
		validate(nome, "String");
		this.#nome = nome;
	}

	get nome() {
		return this.#nome;
	}

}

export class Mochila {
	#ferramentas;

	constructor() {
		this.#ferramentas = [];
	}

	guarda(ferramenta) {
		validate(ferramenta, Ferramenta);
		this.#ferramentas.push(ferramenta);
	}

	pega(nomeFerramenta) {
		validate(arguments, ["String"]);
		let ferramenta = this.#ferramentas.find(f => f.nome === nomeFerramenta);
		return ferramenta;
	}

	tem(nomeFerramenta) {
		validate(arguments, ["String"]);
		return this.#ferramentas.some(f => f.nome === nomeFerramenta);
	}

	inventario() {
		return this.#ferramentas.map(obj => obj.nome).join(", ");
	}
}

// ---------------------------------------------
export class Objeto {
	#nome;
	#descricaoAntesAcao;
	#descricaoDepoisAcao;
	#acaoOk;

	constructor(nome, descricaoAntesAcao, descricaoDepoisAcao) {
		validate(arguments, ["String"]);
		this.#nome = nome;
		this.#descricaoAntesAcao = descricaoAntesAcao;
		this.#descricaoDepoisAcao = descricaoDepoisAcao;
		this.#acaoOk = false;
	}

	get nome() {
		return this.#nome;
	}

	get acaoOk() {
		return this.#acaoOk;
	}

	set acaoOk(acaoOk) {
		validate(acaoOk, "Boolean");
		this.#acaoOk = acaoOk;
	}

	get descricao() {
		if (!this.acaoOk) {
			return this.#descricaoAntesAcao;
		} else {
			return this.#descricaoDepoisAcao;
		}
	}

	usa(ferramenta, objeto) {
	}
}

// ---------------------------------------------
export class Sala {
	#nome;
	#objetos;
	#ferramentas;
	#portas;
	#engine;

	constructor(nome, engine) {
		validate(arguments, ["String", Engine]);
		this.#nome = nome;
		this.#objetos = new Map();
		this.#ferramentas = new Map();
		this.#portas = new Map();
		this.#engine = engine;
	}

	get nome() {
		return this.#nome;
	}


	get objetos() {
		return this.#objetos;
	}
	a
	get ferramentas() {
		return this.#ferramentas;
	}

	get portas() {
		return this.#portas;
	}

	get engine() {
		return this.#engine;
	}

	objetosDisponiveis() {
		let arrObjs = [...this.#objetos.values()];
		return arrObjs.map(obj => obj.nome + ":" + obj.descricao);
	}

	ferramentasDisponiveis() {
		let arrFer = [...this.#ferramentas.values()];
		return arrFer.map(f => f.nome);
	}

	portasDisponiveis() {
		let arrPortas = [...this.#portas.values()];
		return arrPortas.map(sala => sala.nome);
	}

	pega(nomeFerramenta) {
		validate(nomeFerramenta, "String");
		let ferramenta = this.#ferramentas.get(nomeFerramenta);
		if (ferramenta != null) {
			this.#engine.mochila.guarda(ferramenta);
			this.#ferramentas.delete(nomeFerramenta);
			return true;
		} else {
			return false;
		}
	}

	sai(porta) {
		validate(porta, "String");
		return this.#portas.get(porta);
	}

	async textoDescricao() {
		// Funções para estilização do texto no terminal
		const bold = (text) => `\x1b[1m${text}\x1b[0m`; // Negrito
		const blue = (text) => `\x1b[34m${text}\x1b[0m`; // Azul
		const yellow = (text) => `\x1b[33m${text}\x1b[0m`; // Amarelo
		const green = (text) => `\x1b[32m${text}\x1b[0m`; // Verde
		const red = (text) => `\x1b[31m${text}\x1b[0m`; // Vermelho

		// Animação de carregamento simulada
		const loadingFrames = ["|", "/", "-", "\\"];
		let i = 0;
		process.stdout.write("Carregando ");

		// Cria um loop de animação que altera os símbolos de carregamento
		const interval = setInterval(() => {
			process.stdout.write(`\rCarregando ${loadingFrames[i++ % loadingFrames.length]} `);
		}, 200);

		// Simula um tempo de carregamento antes de exibir a descrição
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Para a animação de carregamento e exibe a mensagem de conclusão
		clearInterval(interval);
		console.log("\rCarregamento concluído! 🎮\n");

		// Monta a descrição da sala com formatação e cores
		let descricao = `${bold("📍 Você está na sala:")} ${blue(this.nome)}\n\n`;

		// Lista os objetos disponíveis na sala
		descricao += `${yellow("🛠️ Objetos:")}\n`;
		descricao += this.objetos.size > 0
			? this.objetosDisponiveis().map(item => `  - ${item}`).join("\n")
			: `  - Nenhum`;

		descricao += `\n\n`;

		// Lista as ferramentas disponíveis
		descricao += `${green("🧰 Ferramentas Disponíveis:")}\n`;
		descricao += this.ferramentas.size > 0
			? this.ferramentasDisponiveis().map(item => `  - ${item}`).join("\n")
			: `  - Nenhuma`;

		descricao += `\n\n`;

		// Lista as portas da sala
		descricao += `${red("🚪 Portas:")}\n`;
		descricao += this.portas.size > 0
			? this.portasDisponiveis().map(item => `  - ${item}`).join("\n")
			: `  - Nenhuma`;

		return descricao;
	}
}

// ---------------------------------------------
export class Engine {
	#mochila;
	#salaCorrente;
	#fim;

	constructor() {
		this.#mochila = new Mochila();
		this.#salaCorrente = null;
		this.#fim = false;
		this.criaCenario();
	}

	get mochila() {
		return this.#mochila;
	}

	get salaCorrente() {
		return this.#salaCorrente;
	}

	set salaCorrente(sala) {
		validate(sala, Sala);
		this.#salaCorrente = sala;
	}

	indicaFimDeJogo() {
		this.#fim = true;
	}

	criaCenario() { }

	async joga() {
		let novaSala = null;
		let acao = "";
		let tokens = null;

		// Lista de comandos disponíveis para o jogador
		const comandosDisponiveis = [
			"fim - Encerra o jogo",
			"pega <ferramenta> - Pega uma ferramenta da sala",
			"inventario - Mostra as ferramentas no seu inventário",
			"sai <porta> - Sair para outra sala",
			"ler <registros> - Ler os registro da explosão da nave",
			"reparar <objeto> - Repara algo",
			"ligar <motor> - Liga o motor do foguete",
			"decolar <nave> - Decola com a nave.",
			"comandos - Exibe os comandos disponíveis"
		];

    // Formatação de texto para o terminal
		const bold = (text) => `\x1b[1m${text}\x1b[0m`; // Negrito
		const green = (text) => `\x1b[32m${text}\x1b[0m`; // Verde
		const yellow = (text) => `\x1b[33m${text}\x1b[0m`; // Amarelo

		while (!this.#fim) {
			console.log("-------------------------");
			console.log(await this.salaCorrente.textoDescricao());

			// Solicita a ação do jogador
			acao = prompt(green(bold("O que voce deseja fazer? ")) + yellow("(Digite 'comandos' para ver as opções) "));
			tokens = acao.split(" ");
			switch (tokens[0]) {
				case "fim":
					this.#fim = true;
					console.log(green("Você encerrou o jogo."));
					break;

				case "pega":
					// Verifica se o objeto está disponível na sala
					if (this.salaCorrente.pega(tokens[1])) {
						console.log(green("Ok! " + tokens[1] + " guardado!"));
					} else {
						console.log(yellow("Objeto " + tokens[1] + " não encontrado."));
					}
					break;

				case "inventario":
					console.log(green("Ferramentas disponíveis: " + this.#mochila.inventario()));
					break;

				case "sai":
					novaSala = this.salaCorrente.sai(tokens[1]);

					if (novaSala == null || !novaSala.nome) {
						console.log("Sala desconhecida ...");
					} else {
						// Bloqueia o acesso ao Hangar caso o jogador não tenha o cartão
						if (novaSala.nome === "Hangar") {
							// Verifica se o cartão de acesso está na mochila
							if (this.#mochila.tem("cartao")) {
								console.log("Você tem o cartão. Acesso liberado...");
								this.salaCorrente = novaSala;
							} else {
								console.log("Você não tem o cartão de acesso necessário para entrar no Hangar de Fuga!");
							}
						} else {
							console.log(`Você saiu para a sala: ${novaSala.nome}`);
							this.salaCorrente = novaSala;
						}
					}
					break;

				case "ler":
					if (tokens.length < 2) {
						console.log(yellow("Você precisa especificar o que deseja ler."));
						break;
					}

					let nomeRegistro = tokens.slice(1).join(" ").toLowerCase();

					// Verifica se o objeto está presente na sala
					let registro = this.salaCorrente.objetos.get(nomeRegistro);

					if (!registro) {
						console.log(yellow(`Não há nenhum "${nomeRegistro}" nesta sala.`));
						break;
					}

					// Verifica se o objeto tem um método `ler`
					if (typeof registro.ler === "function") {
						registro.ler(); // Chama o método ler() do objeto
					} else {
						console.log(yellow(`O objeto "${nomeRegistro}" não pode ser lido.`));
					}
					break;

				case "reparar":
					if (tokens.length < 2) {
						console.log("Você precisa fornecer o nome do objeto a ser reparado.");
						break;
					}

					let nomeObjeto = tokens.slice(1).join(" ").toLowerCase();
					let objeto = this.salaCorrente.objetos.get(nomeObjeto);

					if (!objeto) {
						console.log(`Não há nenhum objeto com o nome "${nomeObjeto}" na sala.`);
						break;
					}

					// Verifica os itens necessários para o reparo
					const temChaveFenda = this.#mochila.tem("chave");
					const temChip = this.#mochila.tem("chip");
					const temBateria = this.#mochila.tem("bateria");
					const temMartelo = this.#mochila.tem("martelo");

					// Lógica para o reparo do "foguete" (necessita chave de fenda e bateria)
					if (nomeObjeto === "foguete") {
						let mensagensFaltando = [];

						if (!temChaveFenda) {
							mensagensFaltando.push("Você precisa de uma chave de fenda para reparar o foguete.");
						}

						if (!temBateria) {
							mensagensFaltando.push("Você precisa da bateria reserva para reparar o foguete.");
						}

						if (mensagensFaltando.length > 0) {
							mensagensFaltando.forEach(mensagem => console.log(mensagem));
							break; // Sai do loop caso algum item esteja faltando
						}

						// Reparo do foguete
						let chaveDeFenda = this.#mochila.pega("chave");
						let bateriaReserva = this.#mochila.pega("bateria");

						if (objeto.reparar(chaveDeFenda, bateriaReserva)) {
							console.log(`Você reparou o ${nomeObjeto} com sucesso!`);
							this.salaCorrente.objetos.set(nomeObjeto, objeto);
							console.log(objeto.descricao); // Imprime a nova descrição
						} else {
							console.log(`Não foi possível reparar o ${nomeObjeto}.`);
						}

					} else if (nomeObjeto === "painel de controle") {

						// Lógica para o reparo do "painel de controle" (necessita chave de fenda e chip)
						if (!temChaveFenda) {
							console.log("Você precisa de uma chave de fenda para reparar o painel.");
							break;
						}

						if (!temChip) {
							console.log("Você precisa de um chip de reparo para consertar o painel.");
							break;
						}

						let chaveDeFenda = this.#mochila.pega("chave");
						let chipDeControle = this.#mochila.pega("chip");

						// Reparo do painel
						if (objeto.reparar(chaveDeFenda, chipDeControle)) {
							console.log(`Você reparou o ${nomeObjeto} com sucesso!`);
							this.salaCorrente.objetos.set(nomeObjeto, objeto);
							console.log(objeto.descricao); // Imprime a nova descrição
						} else {
							console.log(`Não foi possível reparar o ${nomeObjeto}.`);
						}

					} else if (nomeObjeto === "sistema de propulsao") {

						// Lógica para o reparo do "sistema de propulsão" (necessita martelo)
						if (!temMartelo) {
							console.log("Você precisa de um martelo para reparar o sistema de propulsão.");
							break;
						}

						let martelo = this.#mochila.pega("martelo");

						// Reparo do sistema de propulsão
						if (objeto.reparar(martelo)) {
							console.log(`Você reparou o ${nomeObjeto} com sucesso!`);
							this.salaCorrente.objetos.set(nomeObjeto, objeto);
							console.log(objeto.descricao); // Imprime a nova descrição
						} else {
							console.log(`Não foi possível reparar o ${nomeObjeto}.`);
						}

					} else {
						console.log(`Não há um objeto reparável chamado "${nomeObjeto}" nesta sala.`);
					}
					break;

				case "ligar":
					console.log(yellow("comando indisponivel no momento!"));
					break;

				case "decolar":
					console.log(yellow("comando indisponivel no momento!"));
					break;

				case "comandos":
					console.log(green("Comandos Disponíveis:"));
					comandosDisponiveis.forEach(comando => console.log(yellow(comando)));
					break;

				default:
					console.log(yellow("Comando desconhecido: " + tokens[0]));
					break;
			}
		}
	}
}