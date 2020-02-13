<?php

namespace App\Http\Controllers;

use App\Consulta;
use App\Hospitalizacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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

    public function getConsultasActivas()
    {
        $busqueda = DB::table('consultas as c')
            ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->select('c.*', 'm.nombre as nombreMascota', 'm.id as idMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
            ->where('c.id_estado', '=', '1')
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'consultas' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas activas de momento.'];
        }
    }

    public function getConsultasInactivas()
    {
        $busqueda = DB::table('consultas as c')
            ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->select('c.*', 'm.nombre as nombreMascota', 'm.id as idMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
            ->where('c.id_estado', '=', '2')
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'consultas' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas Inactivas de momento.'];
        }
    }

    public function getConsultasInactivaPorIdMascota($id)
    {
        $busqueda = DB::table('consultas as c')
            ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->join('genero_mascota as gm', 'gm.id', '=', 'm.genero')
            ->select('c.*', 'm.nombre as nombreMascota', 'm.fecha_nacimiento as fechaNacimientoMascota', 'm.raza', 'gm.descripcion as generoMawscota', 'm.color', 'm.created_at as fechaIngresoMascota', 'm.id as idMascota', 'cl.nombre as nombreDuenio', 'cl.direccion', 'cl.numero', 'cl.correo', 'cl.rut', 'cl.created_at as fechaIngresoDuenio', 'tm.descripcion as tipoMascota')
            ->where('c.id_estado', '=', '2')
            ->where('m.id', '=', $id)
            ->get();
        if (count($busqueda) > 0) {
            //OBTENER EDAD
            $anio = intval(Carbon::parse($busqueda[0]->fechaNacimientoMascota)->format('Y'));
            $dia =  intval(Carbon::parse($busqueda[0]->fechaNacimientoMascota)->format('d'));
            $mes = intval(Carbon::parse($busqueda[0]->fechaNacimientoMascota)->format('m'));
            $edad = Carbon::createFromDate($anio, $mes, $dia)->age;
            foreach ($busqueda as $key) {
                setlocale(LC_TIME, 'es');
                $key->created_at = Carbon::parse($key->created_at)->formatLocalized('%d %B del %Y');
            }
        }
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'consultas' => $busqueda, 'datosBasicos' => $busqueda[0], 'edad' => $edad];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas Inactivas de momento.'];
        }
    }

    public function setProcedimientoConsulta(Request $request)
    {
        $consulta = Consulta::find($request->id);
        if (!is_null($consulta)) {
            $consulta->peso = $request->peso;
            $consulta->procedimiento = $request->procedimiento;
            if ($consulta->save()) {
                if ($request->checkHospitalizacion == 'true') {
                    $hosp = new Hospitalizacion();
                    $hosp->motivo = $request->motivoHospitalizacion;
                    $hosp->id_estado = '1';
                    $hosp->id_mascota = $request->idMascota;
                    $hosp->id_usuario = '1';
                    if ($hosp->save()){
                        return ['estado' => 'success', 'mensaje' => 'Procedimiento con Hospitalizacion agregado correctamente.'];
                    }else{
                        return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al ingresar el procedimiento con hospitalizacion.'];
                    }
                } else {
                    return ['estado' => 'success', 'mensaje' => 'procedimiento agregado correctamente.'];
                }
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al ingresar el procedimiento.'];
            }
        } else {
            return ['estado' => 'failed', 'mensaje' => 'No se ha encontrado al consulta solicitada.'];
        }
    }

    public function setConsultaFinalizada(Request $request)
    {
        $consulta = Consulta::find($request->id);
        if (!is_null($consulta)) {
            $consulta->id_estado = '2';
            if ($consulta->save()) {
                return ['estado' => 'success', 'mensaje' => 'Consulta Finalizada Correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al finalizar la consulta.'];
            }
        } else {
            return ['estado' => 'failed', 'mensaje' => 'No se ha encontrado al consulta solicitada.'];
        }
    }
}
