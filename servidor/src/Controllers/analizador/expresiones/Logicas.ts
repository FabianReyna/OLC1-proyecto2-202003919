import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Logicas extends Instruccion {
    private logic1: Instruccion | undefined;
    private logic2: Instruccion | undefined;
    private logica: Logica | undefined;
    private logicU: Instruccion | undefined;

    constructor(logica: Logica, fila: number, col: number, log1: Instruccion, log2?: Instruccion) {
        super(new Tipo(tipoDato.BOOL), fila, col);
        this.logica = logica;
        if (!log2) this.logicU = log1;
        else {
            this.logic1 = log1;
            this.logic2 = log2;
        }
    }


    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let logIzq, logDer, Unico = null;
        if (this.logicU != null) {
            Unico = this.logicU.interpretar(arbol, tabla);
            if (Unico instanceof Errores) return Unico;
        } else {
            logIzq = this.logic1?.interpretar(arbol, tabla);
            if (logIzq instanceof Errores) return logIzq;
            logDer = this.logic2?.interpretar(arbol, tabla);
            if (logDer instanceof Errores) return logDer;
        }

        switch (this.logica) {
            case Logica.OR:
                return this.or(logIzq, logDer);
            case Logica.AND:
                return this.and(logIzq, logDer);
            case Logica.NOT:
                return this.not(Unico);
            default:
                return new Errores('Semantico', 'Operador Logico Invalido', this.linea, this.col);

        }
    }

    or(log1: any, log2: any) {
        let logicando1 = this.logic1?.tipoDato.getTipo();
        let logicando2 = this.logic2?.tipoDato.getTipo();

        if (logicando1 != tipoDato.BOOL || logicando2 != tipoDato.BOOL) {
            return new Errores('Semantico', 'Solo Booleanos se pueden comparar logicamente', this.linea, this.col);
        } else {
            return log1 || log2;
        }
    }

    and(log1: any, log2: any) {
        let logicando1 = this.logic1?.tipoDato.getTipo();
        let logicando2 = this.logic2?.tipoDato.getTipo();

        if (logicando1 != tipoDato.BOOL || logicando2 != tipoDato.BOOL) {
            return new Errores('Semantico', 'Solo Booleanos se pueden comparar logicamente', this.linea, this.col);
        } else {
            return log1 && log2;
        }
    }

    not(logU: any) {
        let logicandoUnico = this.logicU?.tipoDato.getTipo();
        if (logicandoUnico != tipoDato.BOOL) return new Errores('Semantico', 'Solo Booleanos se pueden comparar logicamente', this.linea, this.col);
        else {
            return !logU;
        }
    }
}

export enum Logica {
    OR,
    AND,
    NOT
}