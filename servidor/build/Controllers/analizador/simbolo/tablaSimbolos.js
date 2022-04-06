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
Object.defineProperty(exports, "__esModule", { value: true });
const Tipo_1 = __importStar(require("./Tipo"));
class tablaSimbolo {
    constructor(anterior) {
        this.tablaAnterior = anterior;
        this.tablaActual = new Map();
        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
        this.nombreDato = "";
    }
    getAnterior() {
        return this.tablaAnterior;
    }
    setAnterior(anterior) {
        this.tablaAnterior = anterior;
    }
    getTabla() {
        return this.tablaActual;
    }
    setTabla(tabla) {
        this.tablaActual = tabla;
    }
    getVariable(id) {
        for (let i = this; i != null; i = i.getAnterior()) {
            let busqueda = i.getTabla().get(id.toLowerCase());
            if (busqueda != null) {
                return busqueda;
            }
        }
        return null;
    }
    setVariable(simbolo) {
        let verificacion = this.getVariable(simbolo.getId());
        if (verificacion == null) {
            this.tablaActual.set(simbolo.getId().toLowerCase(), simbolo);
            return true;
        }
        return false;
    }
    getNombre() {
        return this.nombreDato;
    }
    setNombre(nombre) {
        this.nombreDato = nombre;
    }
}
exports.default = tablaSimbolo;
