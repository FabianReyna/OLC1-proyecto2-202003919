import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import AccesoVar from "./AccesoVar";

export default class FuncNativas extends Instruccion {
    private expresion: Instruccion;
    private funcion: Funciones;

    constructor(expresion: Instruccion, funcion: Funciones, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.expresion = expresion;
        this.funcion = funcion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let verificacion = this.expresion.interpretar(arbol, tabla);
        if (verificacion instanceof Errores) return verificacion;
        switch (this.funcion) {
            case Funciones.TOCHARARRAY:
                return this.tochararray(verificacion);
            case Funciones.TOSTRING:
                return this.tostring(verificacion);
            case Funciones.TYPEOF:
                return this.typeoff(verificacion)
            case Funciones.LENGTH:
                return this.length(verificacion)
            case Funciones.ROUND:
                return this.roundd(verificacion)
            case Funciones.TOLOWER:
                return this.tolowerr(verificacion);
            case Funciones.TOUPPER:
                return this.toUpperr(verificacion);
            default:
                return new Errores('Semantico', 'Funcion nativa no valida', this.linea, this.col);

        }
    }

    tochararray(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.CADENA) return new Errores('Semantico', 'Solo cadenas pueden convertirse en char array', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.CARACTER)
        return Array.from(verificacion);
    }

    tostring(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.ENTERO && this.expresion.tipoDato.getTipo() != tipoDato.DECIMAL && this.expresion.tipoDato.getTipo() != tipoDato.BOOL) return new Errores('Semantico', 'Tipo de dato no valido para funcion toString', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.CADENA);
        if (this.expresion.tipoDato.getTipo() == tipoDato.BOOL) {
            if (verificacion) return "true";
            return "false";
        } else {
            return "" + verificacion;
        }
    }

    typeoff(verificacion: any) {
        this.tipoDato.setTipo(tipoDato.CADENA);
        if (typeof verificacion == "object") return "vector"

        switch (this.expresion.tipoDato.getTipo()) {
            case tipoDato.ENTERO:
                return "int";
            case tipoDato.DECIMAL:
                return "double";
            case tipoDato.BOOL:
                return "boolean";
            case tipoDato.CARACTER:
                return "char";
            case tipoDato.CADENA:
                return "string";
            default:
                new Errores('Semantico', 'Tipo no valido en typeof', this.linea, this.col);
        }
    }

    length(verificacion: any) {
        this.tipoDato.setTipo(tipoDato.ENTERO);
        if (typeof verificacion == "object" || this.expresion.tipoDato.getTipo() == tipoDato.CADENA) return verificacion.length
    }

    roundd(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.DECIMAL) return new Errores('Semantico', 'Tipo de dato no valido para funcion round', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.ENTERO);
        return Math.round(verificacion);

    }

    tolowerr(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.CADENA) return new Errores('Semantico', 'Tipo de dato no valido para funcion toLower', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.CADENA);
        return verificacion.toLowerCase();
    }

    toUpperr(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.CADENA) return new Errores('Semantico', 'Tipo de dato no valido para funcion toUpper', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.CADENA);
        return verificacion.toUpperCase();
    }

}

export enum Funciones {
    TOCHARARRAY,
    TOSTRING,
    TYPEOF,
    LENGTH,
    ROUND,
    TOLOWER,
    TOUPPER
}