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

    //Rutas para los clientes
    Route::post('setCliente', 'ClienteController@setCliente');
    Route::get('getClientePorRut/{rut?}', 'ClienteController@getClientePorRut');
    Route::get('getClientesPorNombre/{nombre?}', 'ClienteController@getClientesPorNombre');
    Route::get('getAllClientes', 'ClienteController@getAllClientes');

    //Rutas para las mascotas
    Route::post('setMascota', 'MascotaController@setMascota');
    Route::get('getMascotasClientePorRut/{rut?}', 'ClienteController@getMascotasClientePorRut');
    Route::get('getMascotasPorNombre/{nombre?}', 'MascotaController@getMascotasPorNombre');
    Route::get('getMascotaPorId/{id}', 'MascotaController@getMascotaPorId');
    Route::get('getMascotasPorIdCliente/{id}', 'ClienteController@getMascotasPorIdCliente');

    //Ruta para las consultas
    Route::post('setConsulta', 'ConsultaController@setConsulta');
    Route::get('getConsultasActivas', 'ConsultaController@getConsultasActivas');
    Route::get('getConsultasInactivas', 'ConsultaController@getConsultasInactivas');
    Route::post('setProcedimientoConsulta', 'ConsultaController@setProcedimientoConsulta');
    Route::get('getProcedimientoConsulta/{id}', 'ConsultaController@getProcedimientoConsulta');
    Route::post('setConsultaFinalizada', 'ConsultaController@setConsultaFinalizada');
    Route::get('getConsultasInactivaPorIdMascota/{id}', 'ConsultaController@getConsultasInactivaPorIdMascota');

    //Ruta para las vacunas
    Route::post('setVacuna', 'HistorialVacunaController@setVacuna');
    Route::get('getVacunasPorIdMascota/{id}', 'HistorialVacunaController@getVacunasPorIdMascota');

    //Ruta para los eventos
    Route::post('setEvento', 'EventoController@setEvento');
    Route::get('getEventos', 'EventoController@getEventos');
    Route::post('updateEvento', 'EventoController@updateEvento');
    Route::post('deleteEvento', 'EventoController@deleteEvento');

    //Ruta para las hospitalizaciones
    Route::get('getHospitalizacionesActivas', 'HospitalizacionController@getHospitalizacionesActivas');
    Route::get('getHospitalizacionPorId/{id}', 'HospitalizacionController@getHospitalizacionPorId');
    Route::post('setHospitalizacionFinalizada', 'HospitalizacionController@setHospitalizacionFinalizada');

    //Rutas para el seguimiento de las hospitalizaciones
    Route::post('setSeguimiento', 'SeguimientoControlller@setSeguimiento');
    Route::get('getSeguimientoPorId/{id}', 'SeguimientoControlller@getSeguimientoPorId');
});
