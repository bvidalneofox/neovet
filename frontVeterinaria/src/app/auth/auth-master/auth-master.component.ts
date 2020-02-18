import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-master',
  templateUrl: './auth-master.component.html',
  styleUrls: ['./auth-master.component.css']
})
export class AuthMasterComponent implements OnInit {
  variabletest = 'lamasfacil';
  title = 'frontVeterinaria';

  constructor() { }

  ngOnInit() {
  }

  abrirSidebar() {
    if (this.variabletest != 'active') {
      this.variabletest = 'active';
    } else {
      this.variabletest = 'lamasfacil';
    }
  }

}
