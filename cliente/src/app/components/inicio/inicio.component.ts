import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  static contenido2: string = "";
  contenido: string = "";

  cuerpo: any = {
    consola: '',
    console: ''
  }

  constructor(private servidor: BackendService) { }

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

  CargaArchivo(event: any) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader()
    var txt: string = "";
    reader.onload = (e) => {
      var result = reader.result
      txt = String(result);
      this.contenido = txt;
    };
    reader.readAsText(file);

  }

  CrearArchivo() {
    this.contenido = "";
    const ver2 = document.getElementById("consolaa")
    if (ver2) {
      ver2.removeAttribute("readOnly");
      ver2.innerHTML = "";
      ver2.setAttribute("readOnly", "");
    }
  }

  Escaneando() {
    this.cuerpo.consola = this.contenido;
    this.servidor.Escaneo(this.cuerpo).subscribe(
      res => {
        var data2 = JSON.parse(JSON.stringify(res));
        this.cuerpo.console = data2.consola;
        alert('Escaneo Finalizado')
      },
      err => {
        alert('OCURRIO UN ERROR')
      }
    )

  }

  GuardarArchivo() {
    const binaryData = [];
    binaryData.push(this.contenido);
    const archivo = window.URL.createObjectURL(new Blob(binaryData, { type: 'archivo.cst' }))
    const descarga = document.createElement('a')
    descarga.href = archivo
    descarga.setAttribute('download', 'archivo.cst')
    document.body.appendChild(descarga)
    descarga.click();
  }

  LimpiarConsola() {
    this.contenido = ""
    this.cuerpo.console = ""
  }

}
