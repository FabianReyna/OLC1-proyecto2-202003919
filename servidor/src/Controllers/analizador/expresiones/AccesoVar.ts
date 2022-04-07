import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class AccesoVar extends Instruccion {
    private id: string;

    constructor(id: string, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.id = id.toLowerCase();

    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = tabla.getVariable(this.id);
        console.log(valor)
        if (valor == null) return new Errores("Semantico", "Variable no existente", this.linea, this.col);
        this.tipoDato=valor.getTipo();
        return valor.getValor();
    }
}