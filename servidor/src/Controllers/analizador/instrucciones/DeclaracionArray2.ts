import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import Simbolo from '../simbolo/simbolo'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class DeclaracionArray2 extends Instruccion {
    private id: string;
    private dimension: number;
    private valor: Array<any>;
    private charArray: Instruccion | undefined;

    constructor(tipo: Tipo, id: string, dimension: number, valor: Array<any>, linea: number, col: number, charArray?: Instruccion) {
        super(tipo, linea, col);
        this.id = id;
        this.dimension = dimension;
        this.valor = valor;
        this.charArray = charArray;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.charArray) {
            let verificado = this.charArray.interpretar(arbol, tabla);
            if (verificado instanceof Errores) return verificado;
            else {
                
                if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, verificado)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                arbol.addSimbolo(this.id, "VECTOR", tabla.getNombre(), this.linea, this.col, "[" + verificado.toString() + "]");
            }
        } else {
            if (this.dimension == 1) {
                let data = []
                let verificacion;
                for (let i = 0; i < this.valor.length; i++) {
                    switch (this.tipoDato.getTipo()) {
                        case tipoDato.ENTERO:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores) return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(parseInt(verificacion));
                            break;
                        case tipoDato.DECIMAL:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores) return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != tipoDato.DECIMAL) return new Errores("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(parseFloat(verificacion));
                            break;
                        case tipoDato.BOOL:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores) return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(verificacion);
                            break;
                        case tipoDato.CARACTER:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores) return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != tipoDato.CARACTER) return new Errores("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(verificacion);
                            break;
                        case tipoDato.CADENA:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores) return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != tipoDato.CADENA) return new Errores("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(verificacion);
                            break;
                        default:
                            return new Errores("Semantico", "Tipo de dato invalido", this.linea, this.col);
                    }
                }
                this.valor = data;
                if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                arbol.addSimbolo(this.id, "VECTOR", tabla.getNombre(), this.linea, this.col, "[" + this.valor.toString() + "]");
            } else {
                let data = []
                let aux = []
                let verificacion;
                let valorAux = "[";

                for (let i = 0; i < this.valor.length; i++) {
                    data = []
                    for (let j = 0; j < this.valor[i].length; j++) {
                        switch (this.tipoDato.getTipo()) {
                            case tipoDato.ENTERO:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores) return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(parseInt(verificacion));
                                break;
                            case tipoDato.DECIMAL:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores) return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != tipoDato.DECIMAL) return new Errores("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(parseFloat(verificacion));
                                break;
                            case tipoDato.BOOL:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores) return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(verificacion);
                                break;
                            case tipoDato.CARACTER:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores) return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != tipoDato.CARACTER) return new Errores("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(verificacion);
                                break;
                            case tipoDato.CADENA:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores) return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != tipoDato.CADENA) return new Errores("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(verificacion);
                                break;
                            default:
                                return new Errores("Semantico", "Tipo de dato invalido", this.linea, this.col);
                        }
                    }
                    if (i == 0) valorAux = valorAux + "[" + data.toString() + "]";
                    else valorAux = valorAux + ",[" + data.toString() + "]";
                    aux.push(data);
                }
                valorAux += "]";
                this.valor = aux;
                if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                arbol.addSimbolo(this.id, "VECTOR", tabla.getNombre(), this.linea, this.col, valorAux);

            }
        }



    }
    
    generarDot(anterior: string) {
        
    }
}