import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './layouts/inicio/inicio.component';
import { RegistroClienteComponent } from './registro/registro-cliente/registro-cliente.component';
import { RegistroMascotaComponent } from './registro/registro-mascota/registro-mascota.component';
import { ListarClientesComponent } from './listar/listar-clientes/listar-clientes.component';
import { TodosClientesComponent } from './listar/todos-clientes/todos-clientes.component';
import { ListarMascotasComponent } from './listar/listar-mascotas/listar-mascotas.component';
import { TodosMascotasComponent } from './listar/todos-mascotas/todos-mascotas.component';
import { FichaClinicaComponent } from './documentos/ficha-clinica/ficha-clinica.component';
import { HojaVacunasComponent } from './documentos/hoja-vacunas/hoja-vacunas.component';
import { VerCalendarioComponent } from './acciones/ver-calendario/ver-calendario.component';
import { InformacionComponent } from './perfil/informacion/informacion.component';
import { ConfiguracionComponent } from './perfil/configuracion/configuracion.component';
import { FichaHospitalizacionComponent } from './documentos/ficha-hospitalizacion/ficha-hospitalizacion.component';
import { LoginComponent } from './public/login/login.component';
import { PublicMasterComponent } from './public/public-master/public-master.component';
import { AuthMasterComponent } from './auth/auth-master/auth-master.component';
import { GuardianService } from './servicios/guardian.service';
import { FichaConsultaComponent } from './documentos/ficha-consulta/ficha-consulta.component';
import { FichaMascotaComponent } from './documentos/ficha-mascota/ficha-mascota.component';
import { FichaClienteComponent } from './documentos/ficha-cliente/ficha-cliente.component';
import { InicioEstadisticasComponent } from './estadisticas/inicio-estadisticas/inicio-estadisticas.component';
import { NuevaRecetaComponent } from './acciones/nueva-receta/nueva-receta.component';
import { ResetPasswordComponent } from './public/reset-password/reset-password.component';
import { NuevaPasswordComponent } from './public/nueva-password/nueva-password.component';

const routes: Routes = [

  //RUTAS PUBLICSA CON HIJOS
  {
    path: '', component: PublicMasterComponent, children:
      [
        { path: '', component: LoginComponent },
        { path: 'olvidePassword', component: ResetPasswordComponent },
        { path: 'cambiarPasswordOlvidada', component: NuevaPasswordComponent }
      ]
  },

  //RUTAS PROTEGIDAS DEL SISTEMA
  {
    path: 'Inicio', component: AuthMasterComponent, canActivate: [GuardianService], children:
      [
        { path: '', component: InicioComponent },
        { path: 'registroCliente', component: RegistroClienteComponent },
        { path: 'registroMascota', component: RegistroMascotaComponent },
        { path: 'buscarCliente', component: ListarClientesComponent },
        { path: 'mostrarClientes', component: TodosClientesComponent },
        { path: 'buscarMascota', component: ListarMascotasComponent },
        { path: 'mostrarMascotas', component: TodosMascotasComponent },
        { path: 'fichaClinica/:idMascota', component: FichaClinicaComponent },
        { path: 'hojaVacunas', component: HojaVacunasComponent },
        { path: 'verCalendario', component: VerCalendarioComponent },
        { path: 'miPerfil', component: InformacionComponent },
        { path: 'fichaConsulta/:idConsulta', component: FichaConsultaComponent },
        { path: 'fichaHospitalizacion/:idHospitalizacion', component: FichaHospitalizacionComponent },
        { path: 'perfilMascota/:idMascota', component: FichaMascotaComponent },
        { path: 'perfilCliente/:idCliente', component: FichaClienteComponent },
        { path: 'configuracion', component: ConfiguracionComponent },
        { path: 'estadisticas', component: InicioEstadisticasComponent },
        { path: 'nuevaReceta', component: NuevaRecetaComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
