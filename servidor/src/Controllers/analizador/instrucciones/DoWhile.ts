import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores } from '../../indexController'
import BreakContinue, { Opcion } from './BreakContinue'

export default class DoWhile extends Instruccion {
    private condicion: Instruccion;
    private expresiones: Instruccion[];

    constructor(condicion: Instruccion, expresiones: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.condicion = condicion;
        this.expresiones = expresiones;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewTabla = new tablaSimbolo(tabla);
        NewTabla.setNombre(tabla.getNombre() + "DO_WHILE-");
        let cond = this.condicion.interpretar(arbol, NewTabla);
        if (cond instanceof Errores) return cond;
        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);
        do {
            console.log(this.condicion.interpretar(arbol, NewTabla))
            let resultado;
            for (let i of this.expresiones) {
                resultado = i.interpretar(arbol, NewTabla);
                
                if (resultado instanceof Errores) listaErrores.push(resultado)
                if (resultado instanceof BreakContinue) {
                    if (resultado.opcion == Opcion.BREAK) return; 
                    if (resultado.opcion == Opcion.CONTINUE) break;
                }
            }
        } while (this.condicion.interpretar(arbol, NewTabla));

    }

    generarDot(anterior: string) {
        
    }

}