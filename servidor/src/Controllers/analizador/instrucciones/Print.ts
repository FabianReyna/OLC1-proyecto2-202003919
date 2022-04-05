import {Instruccion} from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, {tipoDato} from '../simbolo/Tipo'

export default class Print extends Instruccion{
    private expresion:Instruccion
    constructor(expresion:Instruccion, linea:number,col:number){
        super(new Tipo(tipoDato.CADENA),linea,col)
        this.expresion=expresion
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor=this.expresion.interpretar(arbol,tabla)
        if(valor instanceof Errores) return valor;
        arbol.Print(valor)
        console.log(valor)
    }
}