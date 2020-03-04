import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChartsModule } from 'ng2-charts';

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
import { FichaMascotaComponent } from './documentos/ficha-mascota/ficha-mascota.component';
import { VerHospitalizacionesActivasComponent } from './acciones/ver-hospitalizaciones-activas/ver-hospitalizaciones-activas.component';
import { FichaHospitalizacionComponent } from './documentos/ficha-hospitalizacion/ficha-hospitalizacion.component';
import { AuthInterceptorService } from './servicios/auth-interceptor.service';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { PublicMasterComponent } from './public/public-master/public-master.component';
import { AuthMasterComponent } from './auth/auth-master/auth-master.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BuscadorMascotasComponent } from './acciones/buscador-mascotas/buscador-mascotas.component';
import { VerHistorialHospitalizacionesComponent } from './acciones/ver-historial-hospitalizaciones/ver-historial-hospitalizaciones.component';
import { FichaConsultaComponent } from './documentos/ficha-consulta/ficha-consulta.component';
import { FichaClienteComponent } from './documentos/ficha-cliente/ficha-cliente.component';
import { InicioEstadisticasComponent } from './estadisticas/inicio-estadisticas/inicio-estadisticas.component';
import { NuevaRecetaComponent } from './acciones/nueva-receta/nueva-receta.component';
import { ResetPasswordComponent } from './public/reset-password/reset-password.component';
import { NuevaPasswordComponent } from './public/nueva-password/nueva-password.component';

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
    NuevaVacunaComponent,
    FichaMascotaComponent,
    VerHospitalizacionesActivasComponent,
    FichaHospitalizacionComponent,
    LoginComponent,
    RegisterComponent,
    PublicMasterComponent,
    AuthMasterComponent,
    BuscadorMascotasComponent,
    VerHistorialHospitalizacionesComponent,
    FichaConsultaComponent,
    FichaClienteComponent,
    InicioEstadisticasComponent,
    NuevaRecetaComponent,
    ResetPasswordComponent,
    NuevaPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SnotifyModule,
    FullCalendarModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
