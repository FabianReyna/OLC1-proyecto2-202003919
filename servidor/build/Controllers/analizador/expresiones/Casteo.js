"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = require("../simbolo/Tipo");
class Casteo extends Instruccion_1.Instruccion {
    constructor(expresion, tipo, linea, col) {
        super(tipo, linea, col);
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        let valor = this.expresion.interpretar(arbol, tabla);
        if (valor instanceof Errores_1.default)
            return valor;
        switch (this.tipoDato.getTipo()) {
            case Tipo_1.tipoDato.ENTERO:
                switch (this.expresion.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseInt(valor);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = valor + '';
                        let res = trans.charCodeAt(0);
                        return res;
                    default:
                        return new Errores_1.default("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (this.expresion.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseFloat(valor);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = valor + '';
                        let res = trans.charCodeAt(0);
                        return res;
                    default:
                        return new Errores_1.default("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                return new Errores_1.default("Semantico", "Casteo Invalido", this.linea, this.col);
            case Tipo_1.tipoDato.CARACTER:
                switch (this.expresion.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.ENTERO:
                        return String.fromCharCode(parseInt(valor));
                    default:
                        return new Errores_1.default("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (this.expresion.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.ENTERO:
                        return "" + valor;
                    case Tipo_1.tipoDato.DECIMAL:
                        return "" + valor;
                    default:
                        return new Errores_1.default("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            default:
                return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
        }
    }
}
exports.default = Casteo;
