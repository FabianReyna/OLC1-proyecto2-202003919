import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores } from '../../indexController'

export default class BreakContinue extends Instruccion {
    public opcion: Opcion
    constructor(option: Opcion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.opcion = option
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.opcion == Opcion.BREAK) return;
        if (this.opcion == Opcion.CONTINUE) return;
    }
}

export enum Opcion {
    BREAK,
    CONTINUE
}