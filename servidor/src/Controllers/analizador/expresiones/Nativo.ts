import { Instruccion } from '../abstracto/Instruccion'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class Nativo extends Instruccion {
    valor: any

    constructor(tipo: Tipo, valor: any, fila: number, col: number) {
        super(tipo, fila, col)
        this.valor = valor;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.tipoDato.getTipo() == tipoDato.BOOL) {
            return this.valor == "true" ? true : false;
        }
        return this.valor
    }

}