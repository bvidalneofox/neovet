import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  variabletest = 'lamasfacil';
  title = 'frontVeterinaria';

  abrirSidebar() {
    if (this.variabletest != 'active') {
      this.variabletest = 'active';
    } else {
      this.variabletest = 'lamasfacil';
    }
  }
}
