import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //RESCATO FUNCION DEL PADRE
  @Output() abrirSidebarParent = new EventEmitter<string>();
  //VARIABLE PARA EL CSS DEL BOTON SIDEBAR
  estilo = 'dot';
  //Variable con nombre del usuario rescatado desde LS
  nombreUser = '';

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.nombreUser = localStorage.getItem('nameUser');
  }

  abrirSidebar(){
    this.abrirSidebarParent.emit('abrirSidebarString');
    if(this.estilo == 'dot'){
      this.estilo = 'dot-sidebar';
    }else{
      this.estilo = 'dot';
    }
  }

  logout(){
    this._loginService.logout().subscribe(response =>{
      if(response.status == 'success'){
        localStorage.removeItem('token');
        this.router.navigate(['']);
      }else{
        alert(response.msg);
      }
    }, error=>{
      console.log(error);
    });
  }

}
