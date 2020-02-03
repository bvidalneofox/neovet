import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './layouts/inicio/inicio.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { RegistroClienteComponent } from './registro/registro-cliente/registro-cliente.component';
import { ListarClientesComponent } from './listar/listar-clientes/listar-clientes.component';
import { RegistroMascotaComponent } from './registro/registro-mascota/registro-mascota.component';
import { TodosClientesComponent } from './listar/todos-clientes/todos-clientes.component';
import { ListarMascotasComponent } from './listar/listar-mascotas/listar-mascotas.component';
import { TodosMascotasComponent } from './listar/todos-mascotas/todos-mascotas.component';
import { FichaClinicaComponent } from './documentos/ficha-clinica/ficha-clinica.component';
import { HojaVacunasComponent } from './documentos/hoja-vacunas/hoja-vacunas.component';
import { NuevaConsultaComponent } from './acciones/nueva-consulta/nueva-consulta.component';
import { VerConsultasActivasComponent } from './acciones/ver-consultas-activas/ver-consultas-activas.component';
import { VerCalendarioComponent } from './acciones/ver-calendario/ver-calendario.component';
import { VerHistorialConsultasComponent } from './acciones/ver-historial-consultas/ver-historial-consultas.component';
import { InformacionComponent } from './perfil/informacion/informacion.component';
import { ConfiguracionComponent } from './perfil/configuracion/configuracion.component';
import { NuevaVacunaComponent } from './acciones/nueva-vacuna/nueva-vacuna.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    RegistroClienteComponent,
    ListarClientesComponent,
    RegistroMascotaComponent,
    TodosClientesComponent,
    ListarMascotasComponent,
    TodosMascotasComponent,
    FichaClinicaComponent,
    HojaVacunasComponent,
    NuevaConsultaComponent,
    VerConsultasActivasComponent,
    VerCalendarioComponent,
    VerHistorialConsultasComponent,
    InformacionComponent,
    ConfiguracionComponent,
    NuevaVacunaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SnotifyModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
