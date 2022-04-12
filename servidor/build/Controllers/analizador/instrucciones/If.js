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
const BreakContinue_1 = __importDefault(require("./BreakContinue"));
class If extends Instruccion_1.Instruccion {
    constructor(cond1, ins1, linea, col, ins2) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.condicion1 = cond1;
        this.InsIf = ins1;
        this.InsElse = ins2;
    }
    interpretar(arbol, tabla) {
        let cond1 = this.condicion1.interpretar(arbol, tabla);
        if (cond1 instanceof Errores_1.default)
            return cond1;
        if (this.condicion1.tipoDato.getTipo() != Tipo_1.tipoDato.BOOL)
            return new Errores_1.default("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);
        if (!this.InsElse) {
            let NewTabla = new tablaSimbolos_1.default(tabla);
            NewTabla.setNombre(tabla.getNombre() + "IF-");
            if (cond1) {
                for (let i of this.InsIf) {
                    let resultado = i.interpretar(arbol, NewTabla);
                    if (resultado instanceof Errores_1.default)
                        indexController_1.listaErrores.push(resultado);
                    if (i instanceof BreakContinue_1.default)
                        return i;
                }
            }
        }
        else {
            let NewTabla1 = new tablaSimbolos_1.default(tabla);
            NewTabla1.setNombre(tabla.getNombre() + "IF-");
            if (cond1) {
                for (let i of this.InsIf) {
                    let resultado = i.interpretar(arbol, NewTabla1);
                    if (resultado instanceof Errores_1.default)
                        indexController_1.listaErrores.push(resultado);
                }
            }
            else {
                if (this.InsElse instanceof If) {
                    let resultado = this.InsElse.interpretar(arbol, tabla);
                    if (resultado instanceof Errores_1.default)
                        indexController_1.listaErrores.push(resultado);
                }
                else {
                    let NewTabla2 = new tablaSimbolos_1.default(tabla);
                    NewTabla2.setNombre(tabla.getNombre() + "ELSE-");
                    for (let i of this.InsElse) {
                        let resultado = i.interpretar(arbol, NewTabla1);
                        if (resultado instanceof Errores_1.default)
                            indexController_1.listaErrores.push(resultado);
                    }
                }
            }
        }
    }
}
exports.default = If;
/*
si InsElse es undefined
    significa que viene un if simple [IF(EXP){INS}], ka bandera no importa
Si InsElse no es undefined
    Si InsElse es no es Instancia de If
        Arreglo de Instrucciones en el else[]
    Si No
        instancia de IF
*/ 
