<?php

namespace App\Http\Controllers;

use App\Seguimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Mascota;

class SeguimientoControlller extends Controller
{

    public function validarDatos($request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'descripcion' => 'required|min:1',
            ],
            [
                'descripcion.required' => 'Debe de ingresar el estado de la mascota',
            ]
        );


        if ($validator->fails()) {
            return ['estado' => 'failed_v', 'mensaje' => $validator->errors()];
        }
        return ['estado' => 'success', 'mensaje' => 'success'];
    }

    public function setSeguimiento(Request $request)
    {
        $validador = $this->validarDatos($request);
        if ($validador['estado'] == 'success') {
            $seguimiento = new Seguimiento();
            $seguimiento->descripcion = $request->descripcion;
            $seguimiento->ruta_archivo = $request->archivo;
            $seguimiento->id_usuario = Auth::user()->id;
            $seguimiento->id_hospitalizacion = $request->id_hospitalizacion;
            if ($request->archivo != 'undefined' && $request->archivo != 'null') {
                $guardarArchivo = $this->guardarArchivo($request->archivo, 'ArchivosSeguimiento/');
                if ($guardarArchivo['estado'] == "success") {
                    $seguimiento->ruta_imagen = $guardarArchivo['archivo'];
                } else {
                    return $guardarArchivo;
                }
            }
            if ($seguimiento->save()) {
                if ($request->esterilizacion == 'true') {
                    $mascota = Mascota::find($request->id_mascota);
                    if (!is_null($mascota)) {
                        $mascota->estado_esterilizado = 1;
                        if ($mascota->save()) {
                            return ['estado' => 'success', 'mensaje' => 'Mascota Actualizada con esterilizacion.'];
                        } else {
                            return ['estado' => 'failed', 'mensaje' => 'Error al actualizar el estado esterilizacion de la mascota.'];
                        }
                    }
                }
                return ['estado' => 'success', 'mensaje' => 'Seguimiento agregado correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha agregado un error al ingresar el seguimiento.'];
            }
        } else {
            return $validador;
        }
    }

    public function getSeguimientoPorId($id)
    {
        $busqueda = DB::table('seguimientos as s')
            ->join('users as u', 'u.id', '=', 's.id_usuario')
            ->select('s.*', 'u.name as nombreVeterinario')
            ->where('s.id_hospitalizacion', $id)
            ->get();
        if (count($busqueda) > 0) {
            return ['estado' => 'success', 'seguimiento' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No se ha encontrado el id de la hospitalizacion.'];
        }
    }

    public function guardarArchivo($archivo, $ruta)
    {
        $filenameext = $archivo->getClientOriginalName();
        $filename = pathinfo($filenameext, PATHINFO_FILENAME);
        $extension = $archivo->getClientOriginalExtension();
        $nombreArchivo = $filename . '_' . time() . '.' . $extension;
        $rutaDB = 'storage/' . $ruta . $nombreArchivo;

        $guardar = Storage::put($ruta . $nombreArchivo, (string) file_get_contents($archivo), 'public');

        if ($guardar) {
            return ['estado' =>  'success', 'archivo' => $rutaDB];
        } else {
            return ['estado' =>  'failed', 'mensaje' => 'Error al intentar guardar el archivo.'];
        }
    }
}
