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
class Ternario extends Instruccion_1.Instruccion {
    constructor(cond, exp1, exp2, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.cond = cond;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    interpretar(arbol, tabla) {
        let condicion = this.cond.interpretar(arbol, tabla);
        if (condicion instanceof Errores_1.default)
            return condicion;
        if (this.cond.tipoDato.getTipo() != Tipo_1.tipoDato.BOOL)
            return new Errores_1.default("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);
        let valor1 = this.exp1.interpretar(arbol, tabla);
        if (valor1 instanceof Errores_1.default)
            return valor1;
        let valor2 = this.exp1.interpretar(arbol, tabla);
        if (valor2 instanceof Errores_1.default)
            return valor2;
        if (condicion) {
            this.tipoDato = this.exp1.tipoDato;
            return valor1;
        }
        else {
            this.tipoDato = this.exp2.tipoDato;
            return valor2;
        }
    }
}
exports.default = Ternario;
