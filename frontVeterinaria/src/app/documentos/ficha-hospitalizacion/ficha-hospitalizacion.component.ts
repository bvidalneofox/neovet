import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params  } from '@angular/router';

@Component({
  selector: 'app-ficha-hospitalizacion',
  templateUrl: './ficha-hospitalizacion.component.html',
  styleUrls: ['./ficha-hospitalizacion.component.css']
})
export class FichaHospitalizacionComponent implements OnInit {
  nombreArchivo = '';

  constructor(private rutaActiva: ActivatedRoute) {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        console.log(params.idHospitalizacion);
      }
    );
  }

  ngOnInit() {
  }

  //FUNCIONES PARA EL BOTON DEL INPUT FILE
  fileClick(){
    document.getElementById('file-test').click();
  }

  updateFile(test){
    this.nombreArchivo = test.target.files[0].name;
  }

}
