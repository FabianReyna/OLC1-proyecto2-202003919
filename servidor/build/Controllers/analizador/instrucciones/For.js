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
const tablaSimbolos_1 = __importDefault(require("../simbolo/tablaSimbolos"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
const indexController_1 = require("../../indexController");
const BreakContinue_1 = __importStar(require("./BreakContinue"));
class For extends Instruccion_1.Instruccion {
    constructor(variable, condicion, actualizacion, expresiones, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.variable = variable;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.expresiones = expresiones;
    }
    interpretar(arbol, tabla) {
        let NewTabla = new tablaSimbolos_1.default(tabla);
        NewTabla.setNombre(tabla.getNombre() + "FOR-");
        let declaracion = this.variable.interpretar(arbol, NewTabla);
        if (declaracion instanceof Errores_1.default)
            return declaracion;
        let cond = this.condicion.interpretar(arbol, NewTabla);
        if (cond instanceof Errores_1.default)
            return cond;
        if (this.condicion.tipoDato.getTipo() != Tipo_1.tipoDato.BOOL)
            return new Errores_1.default("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);
        while (this.condicion.interpretar(arbol, NewTabla)) {
            let resultado;
            for (let i of this.expresiones) {
                resultado = i.interpretar(arbol, NewTabla);
                if (resultado instanceof Errores_1.default)
                    indexController_1.listaErrores.push(resultado);
                if (resultado instanceof BreakContinue_1.default) {
                    if (resultado.opcion == BreakContinue_1.Opcion.BREAK)
                        break;
                    if (resultado.opcion == BreakContinue_1.Opcion.CONTINUE)
                        break;
                }
            }
            if (resultado instanceof BreakContinue_1.default) {
                if (resultado.opcion == BreakContinue_1.Opcion.BREAK)
                    break;
            }
            let actualiza = this.actualizacion.interpretar(arbol, NewTabla);
            if (actualiza instanceof Errores_1.default)
                return actualiza;
        }
    }
}
exports.default = For;
