<?php

namespace App\Http\Controllers;

use App\Historial_antiparasitario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HistorialAntiparasitarioController extends Controller
{
    public function setAntiparasitario(Request $request)
    {
        $vacuna = new Historial_antiparasitario();
        $vacuna->nombre_antiparasitario = $request->nombre_antiparasitario;
        $vacuna->id_mascota = $request->id_mascota;
        if ($vacuna->save()) {
            return ['estado' => 'success', 'mensaje' => 'antiparasitario agregado correctamente.'];
        } else {
            return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al ingresar el antiparasitario.'];
        }
    }

    public function getAntiparasitarioPorIdMascota($id)
    {
        $busqueda = DB::table('historial_antiparasitarios as a')
            ->join('mascotas as m', 'm.id', '=', 'a.id_mascota')
            ->select('a.*', 'm.nombre as nombreMascota')
            ->where('m.id', $id)
            ->get();
        if (count($busqueda) > 0) {
            return ['estado' => 'success', 'antiparasitarios' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'La mascota no cuenta con vacunas.'];
        }
    }
}
