import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
  }

  sendEmailPassword(data){
    this._loginService.sendPasswordResetLink(data).subscribe(response=>{
      alert(response.mensaje);
    },error=>{
      console.log(error);
    });
  }

}
