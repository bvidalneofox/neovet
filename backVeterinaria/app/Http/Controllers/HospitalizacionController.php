<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

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
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'hospitalizaciones' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay hospiotalizaciones activas de momento.'];
        }
    }

    public function getHospitalizacionPorId($id){
        $busqueda = DB::table('hospitalizaciones as h')
            ->join('mascotas as m', 'm.id', '=', 'h.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->select('h.id', 'h.created_at', 'm.nombre as nombreMascota', 'm.fecha_nacimiento', 'cl.nombre as nombreDuenio', 'cl.rut', 'cl.numero', 'tm.descripcion as tipoMascota')
            ->where('h.id', $id)
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'hospitalizaciones' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay hospiotalizaciones activas de momento.'];
        }
    }
}
