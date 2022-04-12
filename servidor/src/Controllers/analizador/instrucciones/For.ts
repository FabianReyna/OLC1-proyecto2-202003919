import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores } from '../../indexController'
import BreakContinue, { Opcion } from './BreakContinue'

export default class For extends Instruccion {
    private variable: Instruccion;

    private condicion: Instruccion;
    private actualizacion: Instruccion;
    private expresiones: Instruccion[];

    constructor(variable: Instruccion, condicion: Instruccion, actualizacion: Instruccion, expresiones: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.variable = variable;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.expresiones = expresiones;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewTabla = new tablaSimbolo(tabla);
        NewTabla.setNombre(tabla.getNombre() + "FOR-")
        let declaracion = this.variable.interpretar(arbol, NewTabla);
        if (declaracion instanceof Errores) return declaracion;

        let cond = this.condicion.interpretar(arbol, NewTabla);
        if (cond instanceof Errores) return cond;
        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);

        while (this.condicion.interpretar(arbol, NewTabla)) {
            let resultado;
            for (let i of this.expresiones) {
                resultado = i.interpretar(arbol, NewTabla);
                if (resultado instanceof Errores) listaErrores.push(resultado);
                if (resultado instanceof BreakContinue) {
                    if (resultado.opcion == Opcion.BREAK) break;
                    if (resultado.opcion == Opcion.CONTINUE) break;
                }
            }
            if (resultado instanceof BreakContinue) {
                if (resultado.opcion == Opcion.BREAK) break;
                
            }
            let actualiza = this.actualizacion.interpretar(arbol, NewTabla);
            if (actualiza instanceof Errores) return actualiza;
        }


    }
}
