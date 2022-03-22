import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  static contenido2: string = "";
  contenido: string = "";

  constructor() { }

  ngOnInit(): void {
  }
/*
añadir cosas a la consola
const ver2=document.getElementById("consolaa")
    if(ver2) {
      ver2.removeAttribute("readOnly");
      ver2.innerHTML="hola a todos y a todas";
      ver2.setAttribute("readOnly","");
    }
*/

  AjusteEntrada() {
    this.contenido = InicioComponent.contenido2;
  }

  CargaArchivo() {
    var btn = <HTMLInputElement>document.getElementById("fileee");
    btn.addEventListener('change', onFileSelected)
    var reader = new FileReader()
    var txt: string = "";
    function onFileSelected(event: any) {
      var file = event.target.files[0];

      reader.readAsText(file);
      reader.onload = function OnLoad() {
        var result = reader.result
        txt = String(result);
        InicioComponent.contenido2 = txt;
      }
    }
  }

  CrearArchivo(){
    this.contenido="";
    const ver2=document.getElementById("consolaa")
    if(ver2) {
      ver2.removeAttribute("readOnly");
      ver2.innerHTML="";
      ver2.setAttribute("readOnly","");
    }
  }
/*
  GuardarArchivo(){
    
    const binaryData=[];
    binaryData.push(this.contenido);
    const archivo=window.URL.createObjectURL(new Blob(binaryData,{type:'.cst'}))
    const descarga=document.createElement('a')
    descarga.href=archivo
    descarga.setAttribute('download',"prueba")
    document.body.appendChild(descarga)
    descarga.click();
  }
  */
}
