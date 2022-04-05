import Simbolo from "./simbolo";
import Tipo, { tipoDato } from "./Tipo";

export default class tablaSimbolo {
    private tablaAnterior: tablaSimbolo | any;
    private tipoDato: Tipo;
    private tablaActual: Map<String, Simbolo>;
    private nombreDato: string;

    constructor(anterior?: tablaSimbolo) {
        this.tablaAnterior = anterior
        this.tablaActual = new Map<String, Simbolo>()
        this.tipoDato = new Tipo(tipoDato.ENTERO);
        this.nombreDato = ""
    }

    public getAnterior(): tablaSimbolo {
        return this.tablaAnterior
    }

    public setAnterior(anterior: tablaSimbolo): void {
        this.tablaAnterior = anterior
    }

    public getTabla(): Map<String, Simbolo> {
        return this.tablaActual;
    }

    public setTabla(tabla: Map<String, Simbolo>) {
        this.tablaActual = tabla
    }

    public getVariable(id: string) {
        for (let i: tablaSimbolo = this; i != null; i = i.getAnterior()) {
            let busqueda: Simbolo = <Simbolo>i.getTabla().get(id.toLowerCase())
            if (busqueda != null) {
                return busqueda
            }
        }
        return null;
    }

    public setVariable(simbolo: Simbolo): void {
        let verificacion: any = this.getVariable(simbolo.getId());
        if (verificacion != null) {
            this.tablaActual.set(simbolo.getId().toLowerCase(), simbolo);
        }
        return;
    }

    public getNombre(): string {
        return this.nombreDato
    }

    public setNombre(nombre: string): void {
        this.nombreDato = nombre
    }

}