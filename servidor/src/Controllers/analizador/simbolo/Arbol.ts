import tablaSimbolo from "./tablaSimbolos";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";

export default class Arbol{
    private instrucciones:Array<Instruccion>
    private funciones:Array<Instruccion>;
    private consola:string
    private tablaGlobal:tablaSimbolo
    private errores:Array<Errores>

    constructor(instrucciones:Array<Instruccion>){
        this.instrucciones=instrucciones;
        this.funciones=new Array<Instruccion>();
        this.consola="";
        this.tablaGlobal=new tablaSimbolo();
        this.errores=new Array<Errores>();
    }

    public getConsola():string{
        return this.consola
    }

    public setConsola(console:string):void{
        this.consola=console
    }

    public Print(console:string):void{
        this.consola=`${this.consola}${console}`;
    }

    public Println(console:string):void{
        this.consola=`${this.consola}\n${console}`;
    }

    public getInstrucciones():Array<Instruccion>{
        return this.instrucciones
    }

    public setInstrucciones(instrucciones:Array<Instruccion>):void{
        this.instrucciones=instrucciones
    }

    public getTablaGlobal():tablaSimbolo{
        return this.tablaGlobal
    }

    public setTablaGlobal(tabla:tablaSimbolo){
        this.tablaGlobal=tabla
    }

    public getErrores():any{
        return this.errores
    }

    public getFunciones():Array<Instruccion>{
        return this.funciones
    }

    public setFunciones(funciones:Array<Instruccion>):void{
        this.funciones=funciones;
    }

    public addFunciones(ins:Instruccion):void{
        this.funciones.push(ins)
    }

}