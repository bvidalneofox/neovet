import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { ConfiguracionesService } from 'src/app/servicios/configuraciones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  datosForm = {
    correo: '',
    password: ''
  }

  loading = false;

  constructor(private _loginService: LoginService, private router: Router, private _configuracionesSercice: ConfiguracionesService) { }

  ngOnInit() {
  }

  loginNeoVet(){
    this.loading = true;
    this._loginService.login(this.datosForm).subscribe(response=>{
      if(response.success){
        this.loading = false;
        localStorage.setItem('token', response.token);
        localStorage.setItem('nameUser', response.nameUser);
        this.getDatosConfiguraciones();
        this.router.navigateByUrl('/Inicio');
      }else{
        this.loading = false;
        alert('Usuario No Encontrado');
      }
    }, error=>{
      this.loading = false;
      console.log(error);
    });
  }

  getDatosConfiguraciones(){
    this._configuracionesSercice.getConfiguraciones().subscribe(response=>{
        localStorage.setItem('nombreVeterinaria', response.nombre_veterinaria);
        localStorage.setItem('rutaLogo', response.ruta_imagen);
        console.log("Hola");
    }, error=>{
      console.log(error);
    });
  }

}
