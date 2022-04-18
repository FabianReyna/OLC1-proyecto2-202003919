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
const indexController_1 = require("../../indexController");
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class ModVar extends Instruccion_1.Instruccion {
    constructor(id, expresion, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.id = id;
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        let NewValor = this.expresion.interpretar(arbol, tabla);
        if (NewValor instanceof Errores_1.default)
            return NewValor;
        let valor = tabla.getVariable(this.id.toLowerCase());
        if (valor == null)
            return new Errores_1.default("Semantico", "Variable no existente", this.linea, this.col);
        if (this.expresion.tipoDato.getTipo() != valor.getTipo().getTipo())
            return new Errores_1.default("Semantico", "Tipo de dato no compartible en la asignacion", this.linea, this.col);
        this.tipoDato = valor.getTipo();
        valor.setValor(NewValor);
        arbol.updateSimbolo(this.id, tabla.getNombre(), "" + NewValor);
    }
    generarDot(anterior) {
        let cadena = "";
        let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
        let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
        let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
        let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
        let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
        let nodo6 = "n" + (indexController_1.numeroNodo.no + 6);
        indexController_1.numeroNodo.no += 6;
        cadena += nodo1 + "[label=\"MODVAR\"];\n";
        cadena += nodo2 + "[label=\"ID\"];\n";
        cadena += nodo3 + "[label=\"=\"];\n";
        cadena += nodo4 + "[label=\"EXP\"];\n";
        cadena += nodo5 + "[label=\";\"];\n";
        cadena += nodo6 + "[label=\"" + this.id + "\"];\n";
        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        cadena += nodo1 + "->" + nodo5 + ";\n";
        cadena += nodo2 + "->" + nodo6 + ";\n";
        cadena += this.expresion.generarDot(nodo4);
        return cadena;
    }
}
exports.default = ModVar;
