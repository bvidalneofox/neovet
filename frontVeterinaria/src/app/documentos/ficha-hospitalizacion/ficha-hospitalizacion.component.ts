import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router  } from '@angular/router';
import { HospitalizacionesService } from 'src/app/servicios/hospitalizaciones.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-ficha-hospitalizacion',
  templateUrl: './ficha-hospitalizacion.component.html',
  styleUrls: ['./ficha-hospitalizacion.component.css']
})
export class FichaHospitalizacionComponent implements OnInit {
  //Nombre del file cargado en el input
  nombreArchivo = '';
  //Id Rescatada por ruta
  idHosp = '';
  //Datos de la hospitalizacion obtenida
  datosHospitalizacion = [];
  //Comprobar si al hospitalizacion se encuentra finalizada
  estadoHospitalizacion = 2;
  //Ngmodel del FOrmulario Seguimiento
  archivo: 'undefined';
  descripcion = '';
  //Datos del seguimiento realizados
  datosSeguimiento = [];
  //checkbox de esterilizacion
  esterilizacionCheckBox = false;

  constructor(private _snotify: SnotifyService, private router: Router, private rutaActiva: ActivatedRoute, private _hospitalizacionService: HospitalizacionesService) {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idHosp = params.idHospitalizacion;
      }
    );
  }

  ngOnInit() {
    this.getDatosHospitalizacionPorId();
    this.getSeguimientoPorId();
  }

  getDatosHospitalizacionPorId(){
    this._hospitalizacionService.getHospitalizacionPorId(this.idHosp).subscribe(response =>{
      if(response.estado == 'success'){
        this.datosHospitalizacion = response.hospitalizacion;
        this.estadoHospitalizacion = response.hospitalizacion.id_estado;
      }else{
        alert(response);
      }
    }, error=>{
      console.log(error);
    });
  }

  setSeguimiento(form){
    this._hospitalizacionService.setSeguimiento(this.descripcion, this.archivo, this.idHosp, this.esterilizacionCheckBox, this.datosHospitalizacion).subscribe(response=>{
      if(response.estado == 'success'){
        this.archivo = 'undefined';
        this.descripcion = '';
        this.esterilizacionCheckBox = false;
        this.nombreArchivo = '';
        this.getSeguimientoPorId();
          this._snotify.success(response.mensaje, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            position: 'rightTop'
          });
      }else{
        for (let index = 0; index < Object.keys(response.mensaje).length; index++) {
          this._snotify.warning(response.mensaje[Object.keys(response.mensaje)[index]], {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            position: 'rightTop'
          });
        }
      }
    },error=>{
      console.log(error);
    });
  }

  getSeguimientoPorId(){
    this._hospitalizacionService.getSeguimientoPorId(this.idHosp).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosSeguimiento = response.seguimiento;
        console.log(this.datosSeguimiento);
      }else{
        console.log(response.mensaje);
      }
    }, error=>{
      console.log(error);
    });
  }

  //FUNCIONES PARA EL BOTON DEL INPUT FILE
  fileClick(){
    document.getElementById('file-test').click();
  }

  updateFile(test){
    this.nombreArchivo = test.target.files[0].name;
    this.archivo = test.srcElement.files[0];
  }

  finalizarHospitalizacion(){
    this._hospitalizacionService.setHospitalizacionFinalizada(this.idHosp).subscribe(response =>{
      if(response.estado == 'success'){
        this.router.navigateByUrl('/Inicio');
        this._snotify.success(response.mensaje, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }else{
        this._snotify.warning(response.mensaje, {
          timeout: 5000,
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

  deleteHospitalizacion(metodo){
    this._hospitalizacionService.deleteHospitalizacion(this.idHosp, metodo).subscribe(response=>{
      if(response.estado == 'success'){
        this._snotify.success(response.mensaje, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
        this.router.navigate(['Inicio']);
      }else{
        this._snotify.warning(response.mensaje, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }
    },error=>{
      console.log(error);
    });
  }

}
