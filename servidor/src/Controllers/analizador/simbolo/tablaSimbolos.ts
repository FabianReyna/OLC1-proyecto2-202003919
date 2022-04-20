import Simbolo from "./simbolo";
import Tipo, { tipoDato } from "./Tipo";

export default class tablaSimbolo {
    private esFuncion: boolean;
    private tablaAnterior: tablaSimbolo | any;
    private tablaActual: Map<String, Simbolo>;
    private nombreDato: string;
    

    constructor(bandera: boolean, anterior?: tablaSimbolo) {
        this.esFuncion = bandera;
        this.tablaAnterior = anterior
        this.tablaActual = new Map<String, Simbolo>()
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

    public getVariable2(id: string) {
        for (let i: tablaSimbolo = this; i != null; i = i.getAnterior()) {
            let busqueda: Simbolo = <Simbolo>i.getTabla().get(id.toLowerCase())
            if (busqueda != null) {
                return busqueda
            }
            if(i.esFuncion) return null;
        }
        return null;
    }

    public setVariable(simbolo: Simbolo) {
        let verificacion: any = this.getVariable2(simbolo.getId());
        if (verificacion == null) {
            this.tablaActual.set(simbolo.getId().toLowerCase(), simbolo);
            return true;
        }
        return false;
    }

    public getNombre(): string {
        return this.nombreDato
    }

    public setNombre(nombre: string): void {
        this.nombreDato = nombre
    }

    public getEntorno(id: String) {
        for (let i: tablaSimbolo = this; i != null; i = i.getAnterior()) {
            let busqueda: Simbolo = <Simbolo>i.getTabla().get(id.toLowerCase())
            if (busqueda != null) {
                return i.getNombre();
            }
        }
        return "";
    }

}