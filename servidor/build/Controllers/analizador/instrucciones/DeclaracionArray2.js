"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const simbolo_1 = __importDefault(require("../simbolo/simbolo"));
const Tipo_1 = require("../simbolo/Tipo");
class DeclaracionArray2 extends Instruccion_1.Instruccion {
    constructor(tipo, id, dimension, valor, linea, col, charArray) {
        super(tipo, linea, col);
        this.id = id;
        this.dimension = dimension;
        this.valor = valor;
        this.charArray = charArray;
    }
    interpretar(arbol, tabla) {
        if (this.charArray) {
            let verificado = this.charArray.interpretar(arbol, tabla);
            if (verificado instanceof Errores_1.default)
                return verificado;
            else {
                if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, verificado))))
                    return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
            }
        }
        else {
            if (this.dimension == 1) {
                let data = [];
                let verificacion;
                for (let i = 0; i < this.valor.length; i++) {
                    switch (this.tipoDato.getTipo()) {
                        case Tipo_1.tipoDato.ENTERO:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores_1.default)
                                return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                                return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(parseInt(verificacion));
                            break;
                        case Tipo_1.tipoDato.DECIMAL:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores_1.default)
                                return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != Tipo_1.tipoDato.DECIMAL)
                                return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(parseFloat(verificacion));
                            break;
                        case Tipo_1.tipoDato.BOOL:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores_1.default)
                                return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != Tipo_1.tipoDato.BOOL)
                                return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(verificacion);
                            break;
                        case Tipo_1.tipoDato.CARACTER:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores_1.default)
                                return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != Tipo_1.tipoDato.CARACTER)
                                return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(verificacion);
                            break;
                        case Tipo_1.tipoDato.CADENA:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores_1.default)
                                return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != Tipo_1.tipoDato.CADENA)
                                return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(verificacion);
                            break;
                        default:
                            return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
                    }
                }
                this.valor = data;
                if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                    return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
            }
            else {
                let data = [];
                let aux = [];
                let verificacion;
                for (let i = 0; i < this.valor.length; i++) {
                    data = [];
                    for (let j = 0; j < this.valor[i].length; j++) {
                        switch (this.tipoDato.getTipo()) {
                            case Tipo_1.tipoDato.ENTERO:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores_1.default)
                                    return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                                    return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(parseInt(verificacion));
                                break;
                            case Tipo_1.tipoDato.DECIMAL:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores_1.default)
                                    return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != Tipo_1.tipoDato.DECIMAL)
                                    return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(parseFloat(verificacion));
                                break;
                            case Tipo_1.tipoDato.BOOL:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores_1.default)
                                    return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != Tipo_1.tipoDato.BOOL)
                                    return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(verificacion);
                                break;
                            case Tipo_1.tipoDato.CARACTER:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores_1.default)
                                    return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != Tipo_1.tipoDato.CARACTER)
                                    return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(verificacion);
                                break;
                            case Tipo_1.tipoDato.CADENA:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores_1.default)
                                    return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != Tipo_1.tipoDato.CADENA)
                                    return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(verificacion);
                                break;
                            default:
                                return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
                        }
                    }
                    aux.push(data);
                }
                this.valor = aux;
                console.log(this.valor);
                if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                    return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
            }
        }
    }
}
exports.default = DeclaracionArray2;
