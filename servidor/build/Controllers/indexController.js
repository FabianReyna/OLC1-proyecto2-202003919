"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.listaErrores = void 0;
const Errores_1 = __importDefault(require("./analizador/excepciones/Errores"));
const Arbol_1 = __importDefault(require("./analizador/simbolo/Arbol"));
const tablaSimbolos_1 = __importDefault(require("./analizador/simbolo/tablaSimbolos"));
let tree;
class IndexController {
    prueba(req, res) {
        res.json({ "funciona": "la api" });
    }
    escaneo(req, res) {
        exports.listaErrores = new Array();
        let parser = require("./analizador/analizador");
        try {
            let ast = new Arbol_1.default(parser.parse(req.body.consola));
            var tabla = new tablaSimbolos_1.default();
            ast.setTablaGlobal(tabla);
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errores_1.default) {
                    exports.listaErrores.push(i);
                }
                else {
                    var resultado = i.interpretar(ast, tabla);
                    if (resultado instanceof Errores_1.default) {
                        exports.listaErrores.push(resultado);
                    }
                }
            }
            tree = ast;
            console.log(ast.getTablaGlobal().getTabla());
            res.json({ consola: ast.getConsola() });
        }
        catch (err) {
            res.send({ "ERROR": "ALGO SALIO MAL :(" });
        }
    }
    ast(req, res) {
        res.send({ "AST": "" });
    }
    errores(req, res) {
        res.send({ "Errores": "" });
    }
    simbolos(req, res) {
        res.send({ "SIMBOLOS": "" });
    }
}
exports.indexController = new IndexController();
