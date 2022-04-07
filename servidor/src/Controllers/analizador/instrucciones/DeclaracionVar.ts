import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import Simbolo from '../simbolo/simbolo'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class DeclaracionVar extends Instruccion {
    private identificadores: string[];
    private valor: Instruccion | undefined;

    constructor(tipo: Tipo, linea: number, col: number, ids: string[], val: Instruccion | undefined) {
        super(tipo, linea, col);
        this.identificadores = ids;
        this.valor = val;
    }


    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (!this.valor) {
            switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], 0)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                    }
                case tipoDato.DECIMAL:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], 0.0)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                    }
                case tipoDato.BOOL:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], true)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                    }
                case tipoDato.CARACTER:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], '\u0000')))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                    }
                case tipoDato.CADENA:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], "")))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                    }
                default:
                    return new Errores("Semantico", "Asigancion de no valida", this.linea, this.col);
            }
        } else {
            let valorInterpretado = this.valor.interpretar(arbol, tabla);
            if (valorInterpretado instanceof Errores) return valorInterpretado;
            if (this.tipoDato.getTipo() != this.valor.tipoDato.getTipo()) return new Errores("Semantico", "Tipo de variable y de valor diferentes", this.linea, this.col);
            else {
                switch (this.tipoDato.getTipo()) {
                    case tipoDato.ENTERO:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], parseInt(valorInterpretado))))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        }
                    case tipoDato.DECIMAL:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], parseFloat(valorInterpretado))))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        }
                    case tipoDato.BOOL:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], valorInterpretado)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        }
                    case tipoDato.CARACTER:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], valorInterpretado)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        }
                    case tipoDato.CADENA:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], valorInterpretado)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        }
                    default:
                        return new Errores("Semantico", "Asigancion de no valida", this.linea, this.col);
                }
            }
        }
    }
}
