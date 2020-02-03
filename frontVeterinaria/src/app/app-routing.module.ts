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
import { NuevaConsultaComponent } from './acciones/nueva-consulta/nueva-consulta.component';
import { VerCalendarioComponent } from './acciones/ver-calendario/ver-calendario.component';
import { InformacionComponent } from './perfil/informacion/informacion.component';
import { ConfiguracionComponent } from './perfil/configuracion/configuracion.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'registroCliente', component: RegistroClienteComponent },
  { path: 'registroMascota', component: RegistroMascotaComponent },
  { path: 'buscarCliente', component: ListarClientesComponent},
  { path: 'mostrarClientes', component: TodosClientesComponent},
  { path: 'buscarMascota', component: ListarMascotasComponent },
  { path: 'mostrarMascotas', component: TodosMascotasComponent },
  { path: 'fichaClinica', component: FichaClinicaComponent },
  { path: 'hojaVacunas', component: HojaVacunasComponent },
  { path: 'nuevaConsulta/:id', component: NuevaConsultaComponent },
  { path: 'verCalendario', component: VerCalendarioComponent },
  { path: 'miPerfil', component: InformacionComponent },
  { path: 'configuracion', component: ConfiguracionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
