import {Engine} from "./BaseJogo.js"
import { ModuloDeControle, LaboratorioDePesquisa, HangarDeFuga, SalaDeMotores } from "./Salas.js";

export class JogoDemo extends Engine{
    constructor(){
        super();
    }
    
    criaCenario(){
        // Define as salas que compõem o mapa
        let modulo = new ModuloDeControle(this);
        let laboratorio = new LaboratorioDePesquisa(this);
        let hangar = new HangarDeFuga(this);
        let motores = new SalaDeMotores(this); 

        // Encadeia as salas através das portas
        modulo.portas.set(laboratorio.nome, laboratorio); // O módulo de controle leva ao laboratório
        laboratorio.portas.set(modulo.nome, modulo); // O laboratório leva ao módulo de controle
        laboratorio.portas.set(hangar.nome, hangar); // O laboratório leva ao hangar
        laboratorio.portas.set(motores.nome, motores); // O laboratório leva à sala de motores
        motores.portas.set(laboratorio.nome, laboratorio); // A sala de motores leva ao laboratório
        hangar.portas.set(laboratorio.nome, laboratorio); // O hangar leva ao laboratório


        // Define a sala inicial do jogo
        this.salaCorrente = modulo;
    }
}