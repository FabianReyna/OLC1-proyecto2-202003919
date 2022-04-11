import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class Casteo extends Instruccion {
    private expresion: Instruccion;

    constructor(expresion: Instruccion, tipo: Tipo, linea: number, col: number) {
        super(tipo, linea, col);
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = this.expresion.interpretar(arbol, tabla);
        if (valor instanceof Errores) return valor;

        switch (this.tipoDato.getTipo()) {
            case tipoDato.ENTERO:
                switch (this.expresion.tipoDato.getTipo()) {
                    case tipoDato.DECIMAL:
                        return parseInt(valor);
                    case tipoDato.CARACTER:
                        let trans = valor + '';
                        let res = trans.charCodeAt(0);
                        return res;
                    default:
                        return new Errores("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (this.expresion.tipoDato.getTipo()) {
                    case tipoDato.ENTERO:
                        return parseFloat(valor);
                    case tipoDato.CARACTER:
                        let trans = valor + '';
                        let res = trans.charCodeAt(0);
                        return res;
                    default:
                        return new Errores("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case tipoDato.BOOL:
                return new Errores("Semantico", "Casteo Invalido", this.linea, this.col);
            case tipoDato.CARACTER:
                switch (this.expresion.tipoDato.getTipo()) {
                    case tipoDato.ENTERO:
                        return String.fromCharCode(parseInt(valor));
                    default:
                        return new Errores("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (this.expresion.tipoDato.getTipo()) {
                    case tipoDato.ENTERO:
                        return ""+valor;
                    case tipoDato.DECIMAL:
                        return ""+valor;
                    default:
                        return new Errores("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            default:
                return new Errores("Semantico", "Tipo de dato invalido", this.linea, this.col);
        }
    }
}