import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores } from '../../indexController'
import BreakContinue, { Opcion } from './BreakContinue'

export default class While extends Instruccion {
    private condicion: Instruccion;
    private expresiones: Instruccion[];

    constructor(condicion: Instruccion, expresion: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.condicion = condicion;
        this.expresiones = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond1 = this.condicion.interpretar(arbol, tabla);
        if (cond1 instanceof Errores) return cond1;

        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);


        while (this.condicion.interpretar(arbol, tabla)) {
            let NewTabla = new tablaSimbolo(tabla);
            NewTabla.setNombre(tabla.getNombre() + "WHILE-")
            let resultado;
            for (let i of this.expresiones) {
                resultado = i.interpretar(arbol, NewTabla);
                if (resultado instanceof Errores) listaErrores.push(resultado);
                if (resultado instanceof BreakContinue) {
                    if (resultado.opcion == Opcion.BREAK) return;
                    if (resultado.opcion == Opcion.CONTINUE) break;
                }
            }
        }
    }
    
    generarDot(anterior: string) {
        
    }
}