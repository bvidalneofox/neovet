import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { VacunasService } from 'src/app/servicios/vacunas.service';
import { AntiparasitariosService } from 'src/app/servicios/antiparasitarios.service';

@Component({
  selector: 'app-nueva-vacuna',
  templateUrl: './nueva-vacuna.component.html',
  styleUrls: ['./nueva-vacuna.component.css']
})
export class NuevaVacunaComponent implements OnInit {
  //texto a buscar
  inputBusqueda = '';
  //resultados de la busqueda
  resultadosBusqueda = '';
  //Datos de la mascota
  datosMascota = '';
  //Datos Vacuna de la mascota
  datosVacunas = [];
  //Datos Vacuna de la mascota
  datosAntiparasitarios = [];
  //Set Nombre Temporal de mascota
  nombreTemporal = '';
  //Set ID Temporal de mascota
  idTemporal = '';
  //Variable para el formulario vacuna
  formVacuna = {
    tipoVacuna: '',
    fechaVacuna: ''
  }
  //Variable para los antiparasitarios
  nombreAntiparasitario = '';
  //Variable del gif loading
  loading = false;
  //Variable para los steps del Modal
  step = 0;

  constructor(private _snotify: SnotifyService, private _mascotasService: MascotasService, private _vacunasService: VacunasService, private _antiparasitarioService: AntiparasitariosService) { }

  ngOnInit() {
  }

  setNuevaVacuna(form){
    this._vacunasService.setVacuna(this.datosMascota, this.formVacuna).subscribe(response=>{
      if(response.estado == 'success'){
        form.reset();
        this.formVacuna.tipoVacuna = '';
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
        this.getVacunas(this.idTemporal);
      }else{
        this._snotify.error(response.mensaje, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }
    }, error =>{
      console.log(error);
    });
  }

  getVacunas(id){
    this.idTemporal = id;
    //this.limpiarTablaVacunas();
    this._vacunasService.getVacunasPorIdMascota(id).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosVacunas = response.vacunas;
      }else{
        this._snotify.warning(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }
    }, error=>{
      console.log(error);
    });
  }

  setAntiparasitario(form){
    this._antiparasitarioService.setAntiparasitario(this.datosMascota, this.nombreAntiparasitario).subscribe(response=>{
      form.reset();
        this.formVacuna.tipoVacuna = '';
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
        this.getAntiparasitario(this.idTemporal);
    }, error=>{
      console.log(error);
    });
  }

  getAntiparasitario(id){
    //guardar id al hacer click para no hacer un nuevo servicio
    this.idTemporal = id;
    //this.limpiarTablaVacunas();
    this._antiparasitarioService.getAntiparasitarioPorIdMascota(id).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosAntiparasitarios = response.antiparasitarios;
      }else{
        this._snotify.warning(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }
    }, error=>{
      console.log(error);
    });
  }

  limpiarTablaVacunas(){
    this.datosVacunas = [];
    this.datosAntiparasitarios = [];
  }

  // FUNCIONES PARA OBTENER DATOS DE LA MASCOTA
  getMascotasPorNombre(form) {
    this.loading = true;
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

  cargarMascotaSeleccionada(datos) {
    this.datosMascota = datos;
  }

  controlSteps(accion) {
    switch (accion) {
      case 0:
        this.step = 0;
        break;

      case 1:
        if (this.step == 1) {
          document.getElementById("closeButton").click();
          // Aquí llamar a la función para las vacunas
          this.step = 0;
        } else {
          this.step++;
        }
        break;

      case 2:
        this.step--;
        break;

      default:
        break;
    }
  }

}
