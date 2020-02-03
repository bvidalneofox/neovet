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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

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

//Ruta para las vacunas
Route::post('setVacuna', 'HistorialVacunaController@setVacuna');
Route::get('getVacunasPorIdMascota/{id}', 'HistorialVacunaController@getVacunasPorIdMascota');