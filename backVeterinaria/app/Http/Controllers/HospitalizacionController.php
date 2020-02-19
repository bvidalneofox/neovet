<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Hospitalizacion;

class HospitalizacionController extends Controller
{
    public function getHospitalizacionesActivas()
    {
        $busqueda = DB::table('hospitalizaciones as h')
            ->join('mascotas as m', 'm.id', '=', 'h.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->select('h.id', 'h.created_at', 'm.nombre as nombreMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
            ->where('h.id_estado', '1')
            ->orderBy('created_at', 'desc')
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'hospitalizaciones' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay hospitalizaciones activas de momento.'];
        }
    }

    public function getHospitalizacionesInactivas()
    {
        $busqueda = DB::table('hospitalizaciones as h')
            ->join('mascotas as m', 'm.id', '=', 'h.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->select('h.id', 'h.created_at', 'm.nombre as nombreMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
            ->where('h.id_estado', '2')
            ->orderBy('created_at', 'desc')
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'hospitalizaciones' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay hospitalizaciones Inactivas de momento.'];
        }
    }

    public function getHospitalizacionesInactivasPorRangoFecha($fechaIni = '',$fechaFini = '')
    {
        if (isset($fechaIni) && isset($fechaFini)) {
            $busqueda = DB::table('hospitalizaciones as h')
                ->join('mascotas as m', 'm.id', '=', 'h.id_mascota')
                ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
                ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
                ->select('h.id', 'h.created_at', 'm.nombre as nombreMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
                ->whereBetween('h.created_at', [$fechaIni . ' 00:00:00', $fechaFini . ' 23:59:59'])
                ->where('h.id_estado', '2')
                ->orderBy('created_at', 'desc')
                ->get();
            if (!$busqueda->isEmpty()) {
                return ['estado' => 'success', 'hospitalizaciones' => $busqueda];
            } else {
                return ['estado' => 'failed_unr', 'mensaje' => 'No hay hospitalizaciones Inactivas en el rango seleccionado.'];
            }
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'Debe de seleccionar una fecha de Inicio y fecha de termino para filtrar.'];
        }
    }

    public function getHospitalizacionPorId($id)
    {
        $busqueda = DB::table('hospitalizaciones as h')
            ->join('mascotas as m', 'm.id', '=', 'h.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->join('users as u', 'u.id', '=', 'h.id_usuario')
            ->select('h.id', 'h.created_at', 'h.motivo', 'h.id_estado', 'm.nombre as nombreMascota', 'u.name as nombreVetHosp', 'm.fecha_nacimiento', 'cl.nombre as nombreDuenio', 'cl.rut', 'cl.numero', 'tm.descripcion as tipoMascota')
            ->where('h.id', $id)
            ->get();
        if (!$busqueda->isEmpty()) {
            $anio = intval(Carbon::parse($busqueda[0]->fecha_nacimiento)->format('Y'));
            $dia =  intval(Carbon::parse($busqueda[0]->fecha_nacimiento)->format('d'));
            $mes = intval(Carbon::parse($busqueda[0]->fecha_nacimiento)->format('m'));
            $busqueda[0]->fecha_nacimiento = Carbon::createFromDate($anio, $mes, $dia)->diff(Carbon::now())->format('%y Año/s %m Mes/es y %d Dia/s');
            return ['estado' => 'success', 'hospitalizacion' => $busqueda[0]];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay hospiotalizaciones activas de momento.'];
        }
    }

    public function setHospitalizacionFinalizada(Request $request)
    {
        $consulta = Hospitalizacion::find($request->id);
        if (!is_null($consulta)) {
            $consulta->id_estado = '2';
            if ($consulta->save()) {
                return ['estado' => 'success', 'mensaje' => 'Hospitalización Finalizada Correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al finalizar la hopitalización.'];
            }
        } else {
            return ['estado' => 'failed', 'mensaje' => 'No se ha encontrado al hospitalizacion solicitada.'];
        }
    }
}
