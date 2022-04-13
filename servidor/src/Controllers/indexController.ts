import { Request, Response } from 'express';
import Errores from './analizador/excepciones/Errores';
import Arbol from './analizador/simbolo/Arbol';
import tablaSimbolo from './analizador/simbolo/tablaSimbolos';

export let listaErrores: Array<Errores>;
export let numeroNodo = { no: 10 as number };
let tree: Arbol;
let graphAST: string;

class IndexController {
    public prueba(req: Request, res: Response) {
        res.json({ "funciona": "la api" });
    }

    public escaneo(req: Request, res: Response) {
        numeroNodo.no = 0;
        listaErrores = new Array<Errores>();
        let parser = require("./analizador/analizador");

        try {
            let ast = new Arbol(parser.parse(req.body.consola));
            var tabla = new tablaSimbolo();
            tabla.setNombre("")
            ast.setTablaGlobal(tabla);
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errores) {
                    listaErrores.push(i)
                } else {
                    var resultado = i.interpretar(ast, tabla);
                    if (resultado instanceof Errores) {
                        listaErrores.push(resultado);
                    }
                }
            }
            let cadena = "digraph ast {\n";
            cadena += "nINICIO [label=\"INICIO\"];\n";
            cadena += "nINSTRUCCIONES [label=\"INSTRUCCIONES\"];\n"
            cadena += "nINICIO->nINSTRUCCIONES;\n";
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errores) continue;
                else {
                    cadena += i.generarDot("nINSTRUCCIONES");
                }
            }
            cadena += "\n}"
            graphAST = cadena;
            console.log(graphAST)
            for (let i of listaErrores) {
                ast.Println(i.toString());
            }
            tree = ast;
            //console.log(ast.getTablaGlobal().getTabla())
            //console.log(ast.getSimbolos())
            res.json({ consola: ast.getConsola() })
        } catch (err) {
            res.send({ "ERROR": "ALGO SALIO MAL :(" })

        }
    }

    public ast(req: Request, res: Response) {

    }

    public errores(req: Request, res: Response) {
        res.json({ Errores: listaErrores });
    }

    public simbolos(req: Request, res: Response) {
        res.json({ Simbolos: tree.getSimbolos() });
    }
}

export const indexController = new IndexController();