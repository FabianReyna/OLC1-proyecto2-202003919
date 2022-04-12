"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Tipo_1 = require("../simbolo/Tipo");
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, fila, col) {
        super(tipo, fila, col);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        if (this.tipoDato.getTipo() == Tipo_1.tipoDato.BOOL) {
            return this.valor == "true" ? true : false;
        }
        if (this.tipoDato.getTipo() == Tipo_1.tipoDato.CADENA) {
            let val = this.valor.toString();
            this.valor = val.replace('\\n', '\n').replace('\\t', '\t').replace('\\r', '\r').replace('\\\\', '\\').replace("\\'", "'").replace('\\"', '"');
        }
        return this.valor;
    }
}
exports.default = Nativo;
