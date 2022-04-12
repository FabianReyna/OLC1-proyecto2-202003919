import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import Simbolo from '../simbolo/simbolo'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class DeclaracionArray1 extends Instruccion {
    private id: string;
    private tipoAux: Tipo;
    private size1: Instruccion;
    private size2: Instruccion | undefined;
    private dimension: number;
    private valor: Array<any>

    constructor(tipo: Tipo, tipo2: Tipo, id: string, size: Instruccion, dimension: number, linea: number, col: number, size2?: Instruccion) {
        super(tipo, linea, col);
        this.tipoAux = tipo2;
        this.size1 = size;
        this.size2 = size2;
        this.id = id
        this.dimension = dimension
        this.valor = []

    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.tipoDato.getTipo() != this.tipoAux.getTipo()) return new Errores("Semantico", "TEl vector solo debe tener un mismo tipo de dato", this.linea, this.col);
        if (this.dimension == 1) {
            let tamanio = this.size1.interpretar(arbol, tabla);
            if (tamanio instanceof Errores) return tamanio;
            if (this.size1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
            this.valor = [];
            for (let i = 0; i < tamanio; i++) {
                switch (this.tipoDato.getTipo()) {
                    case tipoDato.ENTERO:
                        this.valor.push(0);
                        break;
                    case tipoDato.DECIMAL:
                        this.valor.push(0.0);
                        break;
                    case tipoDato.BOOL:
                        this.valor.push(true);
                        break;
                    case tipoDato.CARACTER:
                        this.valor.push('\u0000');
                        break;
                    case tipoDato.CADENA:
                        this.valor.push("");
                        break;
                    default:
                        return new Errores("Semantico", "Tipo de dato invalido", this.linea, this.col);
                }
            }
            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
            arbol.addSimbolo(this.id, "VECTOR", tabla.getNombre(), this.linea, this.col, "[" + this.valor.toString() + "]");
        } else {
            let tamanio = this.size1.interpretar(arbol, tabla);
            if (tamanio instanceof Errores) return tamanio;
            if (this.size1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);

            if (!this.size2) return new Errores("Semantico", "Tamaño no definido en el arreglo", this.linea, this.col);
            let tamanio2 = this.size2.interpretar(arbol, tabla);
            if (tamanio2 instanceof Errores) return tamanio2;
            if (this.size2.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);

            this.valor = [];
            let valorAux = "[";
            for (let i = 0; i < tamanio; i++) {
                let aux = [];
                for (let j = 0; j < tamanio2; j++) {
                    switch (this.tipoDato.getTipo()) {
                        case tipoDato.ENTERO:
                            aux.push(0);
                            break;
                        case tipoDato.DECIMAL:
                            aux.push(0.0);
                            break;
                        case tipoDato.BOOL:
                            aux.push(true);
                            break;
                        case tipoDato.CARACTER:
                            aux.push('\u0000');
                            break;
                        case tipoDato.CADENA:
                            aux.push("");
                            break;
                        default:
                            return new Errores("Semantico", "Tipo de dato invalido", this.linea, this.col);
                    }


                }
                if (i == 0) valorAux = valorAux + "[" + aux.toString() + "]"
                else valorAux = valorAux + ",[" + aux.toString() + "]"
                this.valor.push(aux);
            }
            valorAux += "]";
            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
            arbol.addSimbolo(this.id, "VECTOR", tabla.getNombre(), this.linea, this.col, valorAux);
        }
    }
}