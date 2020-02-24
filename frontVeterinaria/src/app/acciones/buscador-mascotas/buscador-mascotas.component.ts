import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { MascotasService } from 'src/app/servicios/mascotas.service';

@Component({
  selector: 'app-buscador-mascotas',
  templateUrl: './buscador-mascotas.component.html',
  styleUrls: ['./buscador-mascotas.component.css']
})
export class BuscadorMascotasComponent implements OnInit {
  //texto a buscar
  inputBusqueda = '';
  //resultados de la busqueda
  resultadosBusqueda = '';
  //Variable para las cargas
  loading = false;

  constructor(private _snotify: SnotifyService, private _mascotasService: MascotasService) { }

  ngOnInit() {
  }

  getMascotasPorNombre(form) {
    this.loading = true;
    console.log(this.inputBusqueda);
    this._mascotasService.getMascotaPorNombre(this.inputBusqueda).subscribe(response => {
      if (response.estado == 'success') {
        this.loading = false;
        form.reset();
        this.resultadosBusqueda = response.mascotas;
      } else {
        this.loading = false;
        this._snotify.error(response.mensaje, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

}
