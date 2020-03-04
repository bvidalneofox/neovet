import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-nueva-password',
  templateUrl: './nueva-password.component.html',
  styleUrls: ['./nueva-password.component.css']
})
export class NuevaPasswordComponent implements OnInit {

  token = null;

  constructor(private route: ActivatedRoute, private _loginService: LoginService) {
    route.queryParams.subscribe(params => {
      this.token = params['token'];
    })
  }

  ngOnInit() {
  }

  setNuevaPass(form) {
    if (form.pass1 == form.pass2) {
      this._loginService.cambiarPassOlvidada(form, this.token).subscribe(response => {
        if(response.estado == 'success'){
          alert(response.mensaje)
        }else{
          alert(response.mensaje);
        }
        console.log(response);
      }, error => {
        console.log(error);
      });
    }else{
      alert('Contraseñas no coinciden');
    }
  }

}
