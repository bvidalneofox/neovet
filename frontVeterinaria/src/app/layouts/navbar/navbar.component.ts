import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  abrirSidebar(){
    this.abrirSidebarParent.emit('abrirSidebarString');
    if(this.estilo == 'dot'){
      this.estilo = 'dot-sidebar';
    }else{
      this.estilo = 'dot';
    }
  }

}
