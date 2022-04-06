import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import Simbolo from '../simbolo/simbolo'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class DeclaracionArray extends Instruccion {
    private id: string;
    private valor: Array<any> | undefined;
    private dimension: number
    private size1: Instruccion;
    private size2: Instruccion;

    constructor(tipo: Tipo, id: string, linea: number, col: number, dimension: number, valor: [] | undefined, size1: Instruccion, size2: Instruccion) {
        super(tipo, linea, col);
        this.id = id;
        this.dimension = dimension;
        this.valor = valor;
        this.size1 = size1;
        this.size2 = size2;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        if (this.size1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
        let tamanio = this.size1.interpretar(arbol, tabla);
        switch (this.dimension) {
            case 1:
                if (this.valor == null) {
                    switch (this.tipoDato.getTipo()) {
                        case tipoDato.ENTERO:
                            this.valor = []
                            for (let i = 0; i < tamanio; i++) {
                                this.valor.push(0);
                            }
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case tipoDato.DECIMAL:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                this.valor.push(0.0);
                            }
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case tipoDato.BOOL:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                this.valor.push(true);
                            }
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case tipoDato.CARACTER:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                this.valor.push('\u0000');
                            }
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case tipoDato.CADENA:
                            this.valor = [];
                            for (let i = 0; i < tamanio; i++) {
                                this.valor.push("");
                            }
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                    }
                } else {

                }
            case 2:
                
                if (this.size2.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
                let tamanio2 = this.size2.interpretar(arbol, tabla);
                let aux = []
                if (this.valor == null) {
                    switch (this.tipoDato.getTipo()) {
                        case tipoDato.ENTERO:
                            this.valor = []
                            for (let i = 0; i < tamanio; i++) {
                                aux = []
                                for (let j = 0; j < tamanio2; j++) {
                                    aux.push(0);
                                }
                                this.valor.push(aux)
                            }
                            console.log(this.valor)
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case tipoDato.DECIMAL:
                            this.valor = []
                            for (let i = 0; i < tamanio; i++) {
                                aux = []
                                for (let j = 0; j < tamanio2; j++) {
                                    aux.push(0.0);
                                }
                                this.valor.push(aux)
                            }
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case tipoDato.BOOL:
                            this.valor = []
                            for (let i = 0; i < tamanio; i++) {
                                aux = []
                                for (let j = 0; j < tamanio2; j++) {
                                    aux.push(true);
                                }
                                this.valor.push(aux)
                            }
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case tipoDato.CARACTER:
                            this.valor =[]
                            for (let i = 0; i < tamanio; i++) {
                                aux=[]
                                for (let j = 0; j < tamanio2; j++) {
                                    aux.push('\u0000');
                                }
                                this.valor.push(aux)
                            }
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                        case tipoDato.CADENA:
                            this.valor =[]
                            for (let i = 0; i < tamanio; i++) {
                                aux=[]
                                for (let j = 0; j < tamanio2; j++) {
                                    aux.push("");
                                }
                                this.valor.push(aux)
                            }
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.id, this.valor)))) return new Errores("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);

                    }
                } else {

                }
            default:
                break;
        }


    }

}
