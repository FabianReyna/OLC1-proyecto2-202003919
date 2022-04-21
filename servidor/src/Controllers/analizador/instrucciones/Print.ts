import { numeroNodo } from '../../indexController'
import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class Print extends Instruccion {
    private expresion: Instruccion
    constructor(expresion: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.CADENA), linea, col)
        this.expresion = expresion
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let valor = this.expresion.interpretar(arbol, tabla);
        console.log("Print ",this.expresion,"Value",valor)
        if (valor instanceof Errores) return valor;
        arbol.Print(valor)
    }

    generarDot(anterior: string) {
        let cadena = "";
        let nodo1 = "n" + (numeroNodo.no + 1);
        let nodo2 = "n" + (numeroNodo.no + 2);
        let nodo3 = "n" + (numeroNodo.no + 3);
        let nodo4 = "n" + (numeroNodo.no + 4);
        let nodo5 = "n" + (numeroNodo.no + 5);
        let nodo6 = "n" + (numeroNodo.no + 6);

        numeroNodo.no += 6;
        cadena += nodo1 + "[label=\"PRINTT\"];\n";
        cadena += nodo2 + "[label=\"print\"];\n";
        cadena += nodo3 + "[label=\"(\"];\n";
        cadena += nodo4 + "[label=\"EXP\"];\n";
        cadena += nodo5 + "[label=\")\"];\n";
        cadena += nodo6 + "[label=\";\"];\n";
        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        cadena += nodo1 + "->" + nodo5 + ";\n";
        cadena += nodo1 + "->" + nodo6 + ";\n";
        cadena += this.expresion.generarDot(nodo4);
        return cadena;
    }
}