<?php

namespace App\Http\Controllers;

use App\Configuracion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConfiguracionController extends Controller
{

    public function validarDatos($request, $idFuncion)
    {
        switch ($idFuncion) {
            case 1:
                $validator = Validator::make(
                    $request->all(),
                    [
                        'archivo' => 'required|file|mimes:pdf,jpeg,png',
                    ],
                    [
                        'archivo.required' => 'Debe de subir un logo',
                        'archivo.mimes' => 'Solo se admiten archivos con formato .pdf, .png, .jpeg',
                    ]
                );
                break;

            case 2:
                $validator = Validator::make(
                    $request->all(),
                    [
                        'nombre' => 'required',
                        'numero' => 'required',
                        'direccion' => 'required',
                    ],
                    [
                        'nombre.required' => 'Debe de ingresar un nombre',
                        'numero.required' => 'Debe de ingresar un numero de contacto',
                        'direccion.required' => 'Debe de ingresar una dirección',
                    ]
                );

            default:
                # code...
                break;
        }

        if ($validator->fails()) {
            return ['estado' => 'failed_v', 'mensaje' => $validator->errors()];
        }
        return ['estado' => 'success', 'mensaje' => 'success'];
    }

    public function setLogoVeterinaria(Request $request)
    {
        $validador = $this->validarDatos($request, 1);
        if ($validador['estado'] == 'success') {
            $configuracion = Configuracion::find('1');
            if (!is_null($configuracion)) {
                $configuracion->ruta_imagen = $request->archivo;
                if ($request->archivo != 'undefined') {
                    $nombreImagen = $request->file('archivo')->getClientOriginalName();
                    $request->file('archivo')->move('images', $nombreImagen);
                    $configuracion->ruta_imagen = 'images/' . $nombreImagen;
                }
                if ($configuracion->save()) {
                    return ['estado' => 'success', 'mensaje' => 'Logo Actualizado Correctamente.'];
                } else {
                    return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al actualizar el Logo.'];
                }
            }
        } else {
            return $validador;
        }
    }

    public function setNombreDireccion(Request $request)
    {
        $validador = $this->validarDatos($request, 2);
        if ($validador['estado'] == 'success') {
            $configuracion = Configuracion::find('1');
            if (!is_null($configuracion)) {
                $configuracion->nombre_veterinaria = $request->nombre;
                $configuracion->direccion = $request->direccion;
                $configuracion->numero = $request->numero;
                if ($configuracion->save()) {
                    return ['estado' => 'success', 'mensaje' => 'Nombre/Direccion Actualizado Correctamente.'];
                } else {
                    return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al actualizar el Nombre/Direccion.'];
                }
            }
        } else {
            return $validador;
        }
    }

    public function getConfiguraciones()
    {
        return Configuracion::all()->first();
    }
}
