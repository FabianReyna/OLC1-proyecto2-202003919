import { Request, Response } from 'express';
import Errores from './analizador/excepciones/Errores';
import Arbol from './analizador/simbolo/Arbol';
import tablaSimbolo from './analizador/simbolo/tablaSimbolos';

export let listaErrores:Array<Errores>;
let tree:Arbol;

class IndexController{
    public prueba(req:Request,res:Response){
        res.json({"funciona":"la api"});
    }

    public escaneo(req:Request,res:Response){
        listaErrores=new Array<Errores>();
        let parser = require("./analizador/analizador");
        
        try{
            let ast=new Arbol(parser.parse(req.body.consola));
            var tabla=new tablaSimbolo();
            ast.setTablaGlobal(tabla);
            for(let i of ast.getInstrucciones()){
                if(i instanceof Errores){
                    listaErrores.push(i)
                }else{
                    var resultado=i.interpretar(ast,tabla);
                    if(resultado instanceof Errores){
                        listaErrores.push(resultado);
                    }
                }
            }
        tree=ast;
        console.log(ast.getTablaGlobal().getTabla())
        res.json({consola:ast.getConsola()})
        }catch(err){
            res.send({"ERROR":"ALGO SALIO MAL :("})

        }
    }

    public ast(req:Request,res:Response){
        res.send({"AST":""});
    }

    public errores(req:Request,res:Response){
        res.send({"Errores":""});
    }

    public simbolos(req:Request,res:Response){
        res.send({"SIMBOLOS":""});
    }
}

export const indexController =new IndexController();