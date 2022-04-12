"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tablaSimbolos_1 = __importDefault(require("./tablaSimbolos"));
const RepSimbolo_1 = __importDefault(require("../reportes/RepSimbolo"));
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.funciones = new Array();
        this.consola = "";
        this.tablaGlobal = new tablaSimbolos_1.default();
        this.errores = new Array();
        this.simbolos = new Array();
    }
    getConsola() {
        return this.consola;
    }
    setConsola(console) {
        this.consola = console;
    }
    Print(console) {
        this.consola = `${this.consola}${console}`;
    }
    Println(console) {
        this.consola = `${this.consola}\n${console}`;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getTablaGlobal() {
        return this.tablaGlobal;
    }
    setTablaGlobal(tabla) {
        this.tablaGlobal = tabla;
    }
    getErrores() {
        return this.errores;
    }
    getFunciones() {
        return this.funciones;
    }
    setFunciones(funciones) {
        this.funciones = funciones;
    }
    addFunciones(ins) {
        this.funciones.push(ins);
    }
    addSimbolo(id, tipo, entorno, linea, col, val) {
        this.simbolos.push(new RepSimbolo_1.default(id, tipo, entorno, linea, col, val));
    }
    updateSimbolo(id, entorno, val) {
        for (let i of this.simbolos) {
            if (i.id == id && i.entorno == entorno) {
                i.valor = val;
                break;
            }
        }
    }
    getSimbolos() {
        return this.simbolos;
    }
}
exports.default = Arbol;
