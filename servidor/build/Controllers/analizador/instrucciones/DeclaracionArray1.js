"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const simbolo_1 = __importDefault(require("../simbolo/simbolo"));
const Tipo_1 = require("../simbolo/Tipo");
class DeclaracionArray1 extends Instruccion_1.Instruccion {
    constructor(tipo, tipo2, id, size, dimension, linea, col, size2) {
        super(tipo, linea, col);
        this.tipoAux = tipo2;
        this.size1 = size;
        this.size2 = size2;
        this.id = id;
        this.dimension = dimension;
        this.valor = [];
    }
    interpretar(arbol, tabla) {
        if (this.tipoDato.getTipo() != this.tipoAux.getTipo())
            return new Errores_1.default("Semantico", "TEl vector solo debe tener un mismo tipo de dato", this.linea, this.col);
        if (this.dimension == 1) {
            if (this.size1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                return new Errores_1.default("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
            let tamanio = this.size1.interpretar(arbol, tabla);
            if (tamanio instanceof Errores_1.default)
                return tamanio;
            this.valor = [];
            for (let i = 0; i < tamanio; i++) {
                switch (this.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.valor.push(0);
                        break;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.valor.push(0.0);
                        break;
                    case Tipo_1.tipoDato.BOOL:
                        this.valor.push(true);
                        break;
                    case Tipo_1.tipoDato.CARACTER:
                        this.valor.push('\u0000');
                        break;
                    case Tipo_1.tipoDato.CADENA:
                        this.valor.push("");
                        break;
                    default:
                        return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
                }
            }
            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
        }
        else {
            if (this.size1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                return new Errores_1.default("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
            let tamanio = this.size1.interpretar(arbol, tabla);
            if (tamanio instanceof Errores_1.default)
                return tamanio;
            if (!this.size2)
                return new Errores_1.default("Semantico", "Tamaño no definido en el arreglo", this.linea, this.col);
            if (this.size2.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                return new Errores_1.default("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
            let tamanio2 = this.size2.interpretar(arbol, tabla);
            if (tamanio2 instanceof Errores_1.default)
                return tamanio2;
            this.valor = [];
            for (let i = 0; i < tamanio; i++) {
                let aux = [];
                for (let j = 0; j < tamanio2; j++) {
                    switch (this.tipoDato.getTipo()) {
                        case Tipo_1.tipoDato.ENTERO:
                            aux.push(0);
                            break;
                        case Tipo_1.tipoDato.DECIMAL:
                            aux.push(0.0);
                            break;
                        case Tipo_1.tipoDato.BOOL:
                            aux.push(true);
                            break;
                        case Tipo_1.tipoDato.CARACTER:
                            aux.push('\u0000');
                            break;
                        case Tipo_1.tipoDato.CADENA:
                            aux.push("");
                            break;
                        default:
                            return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
                    }
                }
                this.valor.push(aux);
            }
            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
        }
    }
}
exports.default = DeclaracionArray1;
