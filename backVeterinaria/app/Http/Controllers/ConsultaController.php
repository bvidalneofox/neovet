<?php

namespace App\Http\Controllers;

use App\Consulta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConsultaController extends Controller
{
    public function setConsulta(Request $request)
    {
        $consulta = new Consulta();
        $consulta->motivo = $request->motivo;
        $consulta->procedimiento = '';
        $consulta->fecha_consulta = $request->fecha_consulta;
        $consulta->id_estado = '1';
        $consulta->id_mascota = $request->id_mascota;
        $consulta->id_usuario = '1';
        if ($consulta->save()) {
            return ['estado' => 'success', 'mensaje' => 'consulta creada correctamente.'];
        } else {
            return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al crear la consulta.'];
        }
    }

    public function getConsultasActivas(){
        $busqueda = DB::table('consultas as c')
            ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->select('c.*', 'm.nombre as nombreMascota', 'm.id as idMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
            ->where('c.id_estado', '=' , '1')
            ->get();
            if(!$busqueda->isEmpty()){
                return ['estado' => 'success', 'consultas' => $busqueda];
            } else {
                return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas activas de momento.'];
            }
    }

    public function getConsultasInactivas(){
        $busqueda = DB::table('consultas as c')
            ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->select('c.*', 'm.nombre as nombreMascota', 'm.id as idMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
            ->where('c.id_estado', '=' , '2')
            ->get();
            if(!$busqueda->isEmpty()){
                return ['estado' => 'success', 'consultas' => $busqueda];
            } else {
                return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas Inactivas de momento.'];
            }
    }

    public function setProcedimientoConsulta(Request $request){
        $consulta = Consulta::find($request->id);
        if(!is_null($consulta)){
            $consulta->procedimiento = $request->procedimiento;
            if ($consulta->save()) {
                return ['estado' => 'success', 'mensaje' => 'procedimiento agregado correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al ingresar el procedimiento.'];
            }
        }else{
            return ['estado' => 'failed', 'mensaje' => 'No se ha encontrado al consulta solicitada.'];
        }
    }

    public function setConsultaFinalizada(Request $request){
        $consulta = Consulta::find($request->id);
        if(!is_null($consulta)){
            $consulta->id_estado = '2';
            if ($consulta->save()) {
                return ['estado' => 'success', 'mensaje' => 'Consulta Finalizada Correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al finalizar la consulta.'];
            }
        }else{
            return ['estado' => 'failed', 'mensaje' => 'No se ha encontrado al consulta solicitada.'];
        }
    }
}
