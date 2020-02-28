<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Login y Registro
Route::post('login', 'ApiController@login');
Route::post('register', 'ApiController@register');

//RUTAS PROTEGIDAS
Route::group(['middleware' => 'auth.jwt'], function () {
    //DESLOGUEARSE
    Route::get('logout', 'ApiController@logout');

    //Rutas para los usuarios del sistema
    Route::get('getDatosUsuarioSistema', 'UsuarioController@getDatosUsuarioSistema');
    Route::post('updateUsuarioSistema', 'UsuarioController@updateUsuarioSistema');
    Route::post('changePasswordUser','UsuarioController@changePasswordUser');
    Route::post('setUsuario','UsuarioController@setUsuario');
    Route::get('getUsuariosSistema', 'UsuarioController@getUsuariosSistema');
    Route::post('deleteUsuario','UsuarioController@deleteUsuario');

    //Rutas para los clientes
    Route::post('setCliente', 'ClienteController@setCliente');
    Route::post('updateCliente', 'ClienteController@updateCliente');
    Route::get('getClientePorRut/{rut?}', 'ClienteController@getClientePorRut');
    Route::get('getClientePorId/{id?}', 'ClienteController@getClientePorId');
    Route::get('getClientesPorNombre/{nombre?}', 'ClienteController@getClientesPorNombre');
    Route::get('getAllClientes', 'ClienteController@getAllClientes');

    //Rutas para las mascotas
    Route::post('setMascota', 'MascotaController@setMascota');
    Route::post('updateMascota', 'MascotaController@updateMascota');
    Route::post('updateNumeroChip', 'MascotaController@updateNumeroChip');
    Route::post('updateDuenioMascota', 'MascotaController@updateDuenioMascota');
    Route::get('getMascotasClientePorRut/{rut?}', 'ClienteController@getMascotasClientePorRut');
    Route::get('getMascotasPorNombre/{nombre?}', 'MascotaController@getMascotasPorNombre');
    Route::get('getMascotaPorId/{id}', 'MascotaController@getMascotaPorId');
    Route::get('getMascotasPorIdCliente/{id}', 'ClienteController@getMascotasPorIdCliente');
    Route::get('getPesoMascotaUltimosControles/{id}', 'MascotaController@getPesoMascotaUltimosControles');

    //Ruta para las consultas
    Route::post('setConsulta', 'ConsultaController@setConsulta');
    Route::get('getUltimasConsultasPorIdMascota/{id}','ConsultaController@getUltimasConsultasPorIdMascota');
    Route::get('getConsultasActivas', 'ConsultaController@getConsultasActivas');
    Route::get('getConsultasInactivas', 'ConsultaController@getConsultasInactivas');
    Route::get('getConsultaPorId/{id}', 'ConsultaController@getConsultaPorId');
    Route::get('getConsultasInactivaPorRangoFecha/{fechaInicio?}/{fechaFin?}', 'ConsultaController@getConsultasInactivasPorRangoFecha');
    Route::post('setProcedimientoConsulta', 'ConsultaController@setProcedimientoConsulta');
    Route::get('getProcedimientoConsulta/{id}', 'ConsultaController@getProcedimientoConsulta');
    Route::post('setConsultaFinalizada', 'ConsultaController@setConsultaFinalizada');
    Route::get('getConsultasInactivaPorIdMascota/{id}', 'ConsultaController@getConsultasInactivaPorIdMascota');

    //Ruta para las vacunas
    Route::post('setVacuna', 'HistorialVacunaController@setVacuna');
    Route::get('getVacunasPorIdMascota/{id}', 'HistorialVacunaController@getVacunasPorIdMascota');

    //Ruta para los antiarasitarios
    Route::post('setAntiparasitario','HistorialAntiparasitarioController@setAntiparasitario');
    Route::get('getAntiparasitarioPorIdMascota/{id}','HistorialAntiparasitarioController@getAntiparasitarioPorIdMascota');

    //Ruta para los eventos
    Route::post('setEvento', 'EventoController@setEvento');
    Route::get('getEventos', 'EventoController@getEventos');
    Route::post('updateEvento', 'EventoController@updateEvento');
    Route::post('deleteEvento', 'EventoController@deleteEvento');

    //Ruta para las hospitalizaciones
    Route::get('getHospitalizacionesActivas', 'HospitalizacionController@getHospitalizacionesActivas');
    Route::get('getHospitalizacionesInactivas', 'HospitalizacionController@getHospitalizacionesInactivas');
    Route::get('getHospitalizacionPorId/{id}', 'HospitalizacionController@getHospitalizacionPorId');
    Route::get('getHospitalizacionesInactivasPorRangoFecha/{fechaInicio?}/{fechaFin?}', 'HospitalizacionController@getHospitalizacionesInactivasPorRangoFecha');
    Route::post('setHospitalizacionFinalizada', 'HospitalizacionController@setHospitalizacionFinalizada');

    //Rutas para el seguimiento de las hospitalizaciones
    Route::post('setSeguimiento', 'SeguimientoControlller@setSeguimiento');
    Route::get('getSeguimientoPorId/{id}', 'SeguimientoControlller@getSeguimientoPorId');

    //Ruta para las configuraciones
    Route::post('setLogoVeterinaria', 'ConfiguracionController@setLogoVeterinaria');
    Route::get('getConfiguraciones', 'ConfiguracionController@getConfiguraciones');
    Route::post('setNombreDireccion', 'ConfiguracionController@setNombreDireccion');

    //Ruta para las estadisticas
    Route::get('getEstadisticasConsultas','EstadisticasController@getEstadisticasConsultas');
    Route::get('getEstadisticasHospitalizaciones','EstadisticasController@getEstadisticasHospitalizaciones');
    Route::get('getClientesSistema','EstadisticasController@getClientesSistema');
    Route::get('getUsuariosSistema','EstadisticasController@getUsuariosSistema');
    Route::get('getMascotasSistema','EstadisticasController@getMascotasSistema');
    Route::get('getusuariosConMasProcedimientos','EstadisticasController@getusuariosConMasProcedimientos');
    Route::get('getEstadisticasClientes','EstadisticasController@getEstadisticasClientes');
});
