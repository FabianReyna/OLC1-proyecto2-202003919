"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const simbolo_1 = __importDefault(require("../simbolo/simbolo"));
const Tipo_1 = require("../simbolo/Tipo");
class DeclaracionVar extends Instruccion_1.Instruccion {
    constructor(tipo, linea, col, ids, val) {
        super(tipo, linea, col);
        this.identificadores = ids;
        this.valor = val;
    }
    interpretar(arbol, tabla) {
        if (!this.valor) {
            switch (this.tipoDato.getTipo()) {
                case Tipo_1.tipoDato.ENTERO:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], 0))))
                            return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                    }
                    break;
                case Tipo_1.tipoDato.DECIMAL:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], 0.0))))
                            return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                    }
                    break;
                case Tipo_1.tipoDato.BOOL:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], true))))
                            return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                    }
                    break;
                case Tipo_1.tipoDato.CARACTER:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], '\u0000'))))
                            return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                    }
                    break;
                case Tipo_1.tipoDato.CADENA:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], ""))))
                            return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                    }
                    break;
                default:
                    return new Errores_1.default("Semantico", "Asigancion de no valida", this.linea, this.col);
            }
        }
        else {
            let valorInterpretado = this.valor.interpretar(arbol, tabla);
            if (valorInterpretado instanceof Errores_1.default)
                return valorInterpretado;
            if (this.tipoDato.getTipo() != this.valor.tipoDato.getTipo())
                return new Errores_1.default("Semantico", "Tipo de variable y de valor diferentes", this.linea, this.col);
            else {
                switch (this.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.ENTERO:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], parseInt(valorInterpretado)))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        }
                        break;
                    case Tipo_1.tipoDato.DECIMAL:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], parseFloat(valorInterpretado)))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        }
                        break;
                    case Tipo_1.tipoDato.BOOL:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], valorInterpretado))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        }
                        break;
                    case Tipo_1.tipoDato.CARACTER:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], valorInterpretado))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        }
                        break;
                    case Tipo_1.tipoDato.CADENA:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], valorInterpretado))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        }
                        break;
                    default:
                        return new Errores_1.default("Semantico", "Asigancion de no valida", this.linea, this.col);
                }
            }
        }
    }
}
exports.default = DeclaracionVar;
