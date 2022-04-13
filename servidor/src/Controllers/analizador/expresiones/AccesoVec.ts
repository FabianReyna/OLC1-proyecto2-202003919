import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class AccesoVec extends Instruccion {
    public id: string
    public dimension: number;
    public index1: Instruccion;
    public index2: Instruccion | undefined;

    constructor(id: string, dimension: number, index1: Instruccion, linea: number, col: number, index2?: Instruccion) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.id = id.toLowerCase();
        this.dimension = dimension;
        this.index1 = index1;
        this.index2 = index2;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let arreglo = tabla.getVariable(this.id);
        if (arreglo == null) return new Errores("Semantico", "Variable no existente", this.linea, this.col);
        this.tipoDato = arreglo.getTipo();
        if (this.dimension == 1) {
            let indice1 = this.index1.interpretar(arbol, tabla);
            if (indice1 instanceof Errores) return indice1;
            if (this.index1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
            let valor = arreglo.getValor();
            if (valor[parseInt(indice1)]==undefined) return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
            return valor[parseInt(indice1)];
        } else {
            if (!this.index2) return new Errores("Semantico", "Index Invalido", this.linea, this.col);
            else {
                let indice1 = this.index1.interpretar(arbol, tabla);
                if (indice1 instanceof Errores) return indice1;
                if (this.index1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);

                let indice2 = this.index2.interpretar(arbol, tabla);
                if (indice2 instanceof Errores) return indice2;
                if (this.index2.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                let valor = arreglo.getValor();
                try {
                    if(valor[parseInt(indice1)][parseInt(indice2)]==undefined) return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
                    return valor[parseInt(indice1)][parseInt(indice2)];
                } catch(err) {
                    return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
                }
            }
        }
    }

    generarDot(anterior: string) { 
    }
}
