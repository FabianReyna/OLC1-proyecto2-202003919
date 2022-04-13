import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores } from '../../indexController'
import BreakContinue from './BreakContinue'

export default class If extends Instruccion {
    private condicion1: Instruccion;
    private InsIf: Instruccion[];
    private InsElse: Instruccion[] | If | undefined;

    constructor(cond1: Instruccion, ins1: Instruccion[], linea: number, col: number, ins2?: Instruccion[] | If) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.condicion1 = cond1;
        this.InsIf = ins1;
        this.InsElse = ins2;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond1 = this.condicion1.interpretar(arbol, tabla);
        if (cond1 instanceof Errores) return cond1;
        if (this.condicion1.tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);

        if (!this.InsElse) {
            let NewTabla = new tablaSimbolo(tabla);
            NewTabla.setNombre(tabla.getNombre() + "IF-")
            if (cond1) {
                for (let i of this.InsIf) {
                    let resultado = i.interpretar(arbol, NewTabla);
                    if (resultado instanceof Errores) listaErrores.push(resultado);
                    if(i instanceof BreakContinue) return i;
                }
            }
        } else {
            let NewTabla1 = new tablaSimbolo(tabla);
            NewTabla1.setNombre(tabla.getNombre() + "IF-");

            if (cond1) {
                for (let i of this.InsIf) {
                    let resultado = i.interpretar(arbol, NewTabla1);
                    if (resultado instanceof Errores) listaErrores.push(resultado);
                    if(i instanceof BreakContinue) return i;
                }
            } else {
                if (this.InsElse instanceof If) {
                    let resultado = this.InsElse.interpretar(arbol, tabla);
                    if (resultado instanceof Errores) listaErrores.push(resultado);
                }
                else {
                    let NewTabla2 = new tablaSimbolo(tabla);
                    NewTabla2.setNombre(tabla.getNombre() + "ELSE-");
                    for (let i of this.InsElse) {
                        let resultado = i.interpretar(arbol, NewTabla1);
                        if (resultado instanceof Errores) listaErrores.push(resultado);
                        if(i instanceof BreakContinue) return i;
                    }
                }
            }
        }
    }

    generarDot(anterior: string) {
        
    }
}

/*
si InsElse es undefined 
    significa que viene un if simple [IF(EXP){INS}], ka bandera no importa
Si InsElse no es undefined
    Si InsElse es no es Instancia de If
        Arreglo de Instrucciones en el else[]
    Si No
        instancia de IF
*/