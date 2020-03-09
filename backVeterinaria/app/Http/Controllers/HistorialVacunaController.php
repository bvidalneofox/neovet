<?php

namespace App\Http\Controllers;

use App\Historial_vacuna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class HistorialVacunaController extends Controller
{
    public function validarDatos($request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'id_vacuna' => 'required',
            ],
            [
                'id_vacuna.required' => 'Debe de seleccionar una vacuna',
            ]
        );

        if ($validator->fails()) {
            return ['estado' => 'failed_v', 'mensaje' => $validator->errors()];
        }
        return ['estado' => 'success', 'mensaje' => 'success'];
    }

    public function setVacuna(Request $request)
    {
        $validador = $this->validarDatos($request);
        if ($validador['estado'] == 'success') {
            $vacuna = new Historial_vacuna();
            $vacuna->fecha = $request->fecha;
            $vacuna->id_mascota = $request->id_mascota;
            $vacuna->id_vacuna = $request->id_vacuna;
            if ($vacuna->save()) {
                return ['estado' => 'success', 'mensaje' => 'vacuna agregada correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al ingresar la vacuna.'];
            }
        } else {
            return $validador;
        }
    }

    public function getVacunasPorIdMascota($id)
    {
        $busqueda = DB::table('historial_vacunas as hv')
            ->join('tipo_vacunas as tv', 'tv.id', '=', 'hv.id_vacuna')
            ->join('mascotas as m', 'm.id', '=', 'hv.id_mascota')
            ->select('hv.*', 'tv.descripcion as nombreVacuna', 'm.nombre as nombreMascota')
            ->where('m.id', $id)
            ->get();
        if (count($busqueda) > 0) {
            return ['estado' => 'success', 'vacunas' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'La mascota no cuenta con vacunas.'];
        }
    }
}
