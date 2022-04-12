import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import Simbolo from '../simbolo/simbolo'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class ModVar extends Instruccion {
    private id: string;
    private expresion: Instruccion;

    constructor(id: string, expresion: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.id = id;
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewValor = this.expresion.interpretar(arbol, tabla);
        if (NewValor instanceof Errores) return NewValor;

        let valor = tabla.getVariable(this.id.toLowerCase());
        if (valor == null) return new Errores("Semantico", "Variable no existente", this.linea, this.col);

        if (this.expresion.tipoDato.getTipo() != valor.getTipo().getTipo()) return new Errores("Semantico", "Tipo de dato no compartible en la asignacion", this.linea, this.col);
        this.tipoDato = valor.getTipo();
        valor.setValor(NewValor);
        arbol.updateSimbolo(this.id,tabla.getNombre(),""+NewValor);
    }
}