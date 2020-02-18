import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';

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

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  loginNeoVet(){
    console.log(this.datosForm);
    this._loginService.login(this.datosForm).subscribe(response=>{
      if(response.success){
        localStorage.setItem('token', response.token);
        localStorage.setItem('nameUser', response.nameUser);
        this.router.navigateByUrl('/Inicio');
      }else{
        alert('Usuario No Encontrado');
      }
    }, error=>{
      console.log(error);
    });
  }

}
