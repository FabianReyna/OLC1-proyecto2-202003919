import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class Ternario extends Instruccion {
    private cond: Instruccion;
    private exp1: Instruccion;
    private exp2: Instruccion;

    constructor(cond: Instruccion, exp1: Instruccion, exp2: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.cond = cond;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let condicion = this.cond.interpretar(arbol, tabla);
        if (condicion instanceof Errores) return condicion;

        if (this.cond.tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);

        let valor1 = this.exp1.interpretar(arbol, tabla);
        if (valor1 instanceof Errores) return valor1;

        let valor2 = this.exp1.interpretar(arbol, tabla);
        if (valor2 instanceof Errores) return valor2;
        if (condicion) {
            this.tipoDato = this.exp1.tipoDato;
            return valor1;
        } else {
            this.tipoDato = this.exp2.tipoDato;
            return valor2;
        }



    }
}