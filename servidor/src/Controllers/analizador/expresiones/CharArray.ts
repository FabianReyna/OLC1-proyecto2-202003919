import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class CharArray extends Instruccion {
    private cadena: Instruccion;

    constructor(cadena: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.cadena = cadena;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let verificacion = this.cadena.interpretar(arbol, tabla);
        if (verificacion instanceof Errores) return verificacion;
        if (this.cadena.tipoDato.getTipo() != tipoDato.CADENA) return new Errores('Semantico', 'Solo cadenas pueden convertirse en char array', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.CARACTER)
        return Array.from(verificacion);
    }
}
