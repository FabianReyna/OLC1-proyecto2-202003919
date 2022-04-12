"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class ModVec extends Instruccion_1.Instruccion {
    constructor(id, dimension, expresion, linea, col, index1, index2) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.id = id;
        this.dimension = dimension;
        this.index1 = index1;
        this.expresion = expresion;
        this.index2 = index2;
    }
    interpretar(arbol, tabla) {
        let Newvalor = this.expresion.interpretar(arbol, tabla);
        if (Newvalor instanceof Errores_1.default)
            return Newvalor;
        let arreglo = tabla.getVariable(this.id);
        if (arreglo == null)
            return new Errores_1.default("Semantico", "Variable no existente", this.linea, this.col);
        this.tipoDato = arreglo.getTipo();
        if (this.dimension == 1) {
            let indice1 = this.index1.interpretar(arbol, tabla);
            if (indice1 instanceof Errores_1.default)
                return indice1;
            if (this.index1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                return new Errores_1.default("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
            let valor = arreglo.getValor();
            if (valor[parseInt(indice1)] == undefined)
                return new Errores_1.default("Semantico", "Index fuera del rango", this.linea, this.col);
            switch (this.expresion.tipoDato.getTipo()) {
                case Tipo_1.tipoDato.ENTERO:
                    valor[parseInt(indice1)] = parseInt(Newvalor);
                    break;
                case Tipo_1.tipoDato.DECIMAL:
                    valor[parseInt(indice1)] = parseFloat(Newvalor);
                    break;
                case Tipo_1.tipoDato.BOOL:
                    valor[parseInt(indice1)] = Newvalor;
                    break;
                case Tipo_1.tipoDato.CARACTER:
                    valor[parseInt(indice1)] = Newvalor;
                    break;
                case Tipo_1.tipoDato.CADENA:
                    valor[parseInt(indice1)] = Newvalor;
                    break;
                default:
                    return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
            }
            arreglo.setValor(valor);
            arbol.updateSimbolo(this.id, tabla.getNombre(), "[" + valor.toString() + "]");
        }
        else {
            if (!this.index2)
                return new Errores_1.default("Semantico", "Index Invalido", this.linea, this.col);
            else {
                let indice1 = this.index1.interpretar(arbol, tabla);
                if (indice1 instanceof Errores_1.default)
                    return indice1;
                if (this.index1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                    return new Errores_1.default("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                let indice2 = this.index2.interpretar(arbol, tabla);
                if (indice2 instanceof Errores_1.default)
                    return indice2;
                if (this.index2.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                    return new Errores_1.default("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                let valor = arreglo.getValor();
                try {
                    if (valor[parseInt(indice1)][parseInt(indice2)] == undefined)
                        return new Errores_1.default("Semantico", "Index fuera del rango", this.linea, this.col);
                    switch (this.expresion.tipoDato.getTipo()) {
                        case Tipo_1.tipoDato.ENTERO:
                            valor[parseInt(indice1)][parseInt(indice2)] = parseInt(Newvalor);
                            break;
                        case Tipo_1.tipoDato.DECIMAL:
                            valor[parseInt(indice1)][parseInt(indice2)] = parseFloat(Newvalor);
                            break;
                        case Tipo_1.tipoDato.BOOL:
                            valor[parseInt(indice1)][parseInt(indice2)] = Newvalor;
                            break;
                        case Tipo_1.tipoDato.CARACTER:
                            valor[parseInt(indice1)][parseInt(indice2)] = Newvalor;
                            break;
                        case Tipo_1.tipoDato.CADENA:
                            valor[parseInt(indice1)][parseInt(indice2)] = Newvalor;
                            break;
                        default:
                            return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
                    }
                    arreglo.setValor(valor);
                    let valorAux = "[";
                    for (let i = 0; i < valor.length; i++) {
                        let aux = [];
                        for (let j = 0; j < valor[0].length; j++) {
                            aux.push(valor[i][j]);
                        }
                        if (i == 0)
                            valorAux = valorAux + "[" + aux.toString() + "]";
                        else
                            valorAux = valorAux + ",[" + aux.toString() + "]";
                    }
                    valorAux += "]";
                    arbol.updateSimbolo(this.id, tabla.getNombre(), valorAux);
                }
                catch (err) {
                    return new Errores_1.default("Semantico", "Index fuera del rango", this.linea, this.col);
                }
            }
        }
    }
}
exports.default = ModVec;
