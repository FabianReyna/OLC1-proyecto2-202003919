"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const simbolo_1 = __importDefault(require("../simbolo/simbolo"));
const Tipo_1 = require("../simbolo/Tipo");
class DeclaracionArray extends Instruccion_1.Instruccion {
    constructor(tipo, id, linea, col, dimension, valor, size1, size2) {
        super(tipo, linea, col);
        this.id = id;
        this.dimension = dimension;
        this.valor = valor;
        this.size1 = size1;
        this.size2 = size2;
    }
    interpretar(arbol, tabla) {
        if (this.size1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
            return new Errores_1.default("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
        let tamanio = this.size1.interpretar(arbol, tabla);
        switch (this.dimension) {
            case 1:
                if (this.valor == null) {
                    switch (this.tipoDato.getTipo()) {
                        case Tipo_1.tipoDato.ENTERO:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                this.valor.push(0);
                            }
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case Tipo_1.tipoDato.DECIMAL:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                this.valor.push(0.0);
                            }
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case Tipo_1.tipoDato.BOOL:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                this.valor.push(true);
                            }
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case Tipo_1.tipoDato.CARACTER:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                this.valor.push('\u0000');
                            }
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case Tipo_1.tipoDato.CADENA:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                this.valor.push("");
                            }
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                    }
                }
                else {
                }
            case 2:
                if (this.size2.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                    return new Errores_1.default("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
                let tamanio2 = this.size2.interpretar(arbol, tabla);
                let aux = [];
                if (this.valor == null) {
                    switch (this.tipoDato.getTipo()) {
                        case Tipo_1.tipoDato.ENTERO:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                aux = [];
                                for (let j = 0; j < tamanio2; j++) {
                                    aux.push(0);
                                }
                                this.valor.push(aux);
                            }
                            console.log(this.valor);
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case Tipo_1.tipoDato.DECIMAL:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                aux = [];
                                for (let j = 0; j < tamanio2; j++) {
                                    aux.push(0.0);
                                }
                                this.valor.push(aux);
                            }
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case Tipo_1.tipoDato.BOOL:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                aux = [];
                                for (let j = 0; j < tamanio2; j++) {
                                    aux.push(true);
                                }
                                this.valor.push(aux);
                            }
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case Tipo_1.tipoDato.CARACTER:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                aux = [];
                                for (let j = 0; j < tamanio2; j++) {
                                    aux.push('\u0000');
                                }
                                this.valor.push(aux);
                            }
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case Tipo_1.tipoDato.CADENA:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                aux = [];
                                for (let j = 0; j < tamanio2; j++) {
                                    aux.push("");
                                }
                                this.valor.push(aux);
                            }
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                    }
                }
                else {
                }
            default:
                break;
        }
    }
}
exports.default = DeclaracionArray;
