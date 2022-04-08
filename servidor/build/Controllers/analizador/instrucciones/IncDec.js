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
const AccesoVar_1 = __importDefault(require("../expresiones/AccesoVar"));
const AccesoVec_1 = __importDefault(require("../expresiones/AccesoVec"));
class IncDec extends Instruccion_1.Instruccion {
    //1 para incremento - 0 para decremento
    constructor(expresion, operacion, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.expresion = expresion;
        this.operacion = operacion;
    }
    interpretar(arbol, tabla) {
        if (this.expresion instanceof AccesoVar_1.default) {
            let variable = tabla.getVariable(this.expresion.id);
            if (variable == null)
                return new Errores_1.default("Semantico", "La variable" + this.expresion + " no existe", this.linea, this.col);
            if (variable.getTipo().getTipo() != Tipo_1.tipoDato.ENTERO && variable.getTipo().getTipo() != Tipo_1.tipoDato.DECIMAL)
                return new Errores_1.default("Semantico", "La variable" + this.expresion + " debe ser numerica (int o double)", this.linea, this.col);
            this.tipoDato.setTipo(variable.getTipo().getTipo());
            console.log("pasamos la actualizacion ");
            let valor = variable.getValor();
            console.log(this.operacion);
            if (this.operacion == 0) {
                valor--;
            }
            else {
                valor++;
            }
            variable.setValor(valor);
        }
        else if (this.expresion instanceof AccesoVec_1.default) {
            let variable = tabla.getVariable(this.expresion.id);
            if (variable == null)
                return new Errores_1.default("Semantico", "La variable " + this.expresion + " no existe", this.linea, this.col);
            if (variable.getTipo().getTipo() != Tipo_1.tipoDato.ENTERO && variable.getTipo().getTipo() != Tipo_1.tipoDato.DECIMAL)
                return new Errores_1.default("Semantico", "La variable" + this.expresion + " debe ser numerica (int o double)", this.linea, this.col);
            if (this.expresion.dimension == 1) {
                let indice1 = this.expresion.index1.interpretar(arbol, tabla);
                if (indice1 instanceof Errores_1.default)
                    return indice1;
                if (this.expresion.index1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                    return new Errores_1.default("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                let valor = variable.getValor();
                if (valor[parseInt(indice1)] == undefined)
                    return new Errores_1.default("Semantico", "Index fuera del rango", this.linea, this.col);
                if (this.operacion == 0) {
                    valor[parseInt(indice1)]--;
                }
                else {
                    valor[parseInt(indice1)]++;
                }
                variable.setValor(valor);
            }
            else {
                if (!this.expresion.index2)
                    return new Errores_1.default("Semantico", "Index Invalido", this.linea, this.col);
                else {
                    let indice1 = this.expresion.index1.interpretar(arbol, tabla);
                    if (indice1 instanceof Errores_1.default)
                        return indice1;
                    if (this.expresion.index1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                        return new Errores_1.default("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                    let indice2 = this.expresion.index2.interpretar(arbol, tabla);
                    if (indice2 instanceof Errores_1.default)
                        return indice2;
                    if (this.expresion.index2.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                        return new Errores_1.default("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                    let valor = variable.getValor();
                    try {
                        if (valor[parseInt(indice1)][parseInt(indice2)] == undefined)
                            return new Errores_1.default("Semantico", "Index fuera del rango", this.linea, this.col);
                        if (this.operacion == 0) {
                            valor[parseInt(indice1)][parseInt(indice2)]--;
                        }
                        else {
                            valor[parseInt(indice1)][parseInt(indice2)]++;
                        }
                        variable.setValor(valor);
                    }
                    catch (err) {
                        return new Errores_1.default("Semantico", "Index fuera del rango", this.linea, this.col);
                    }
                }
            }
        }
        else {
            return new Errores_1.default("Semantico", "Variable no valida", this.linea, this.col);
        }
    }
}
exports.default = IncDec;
