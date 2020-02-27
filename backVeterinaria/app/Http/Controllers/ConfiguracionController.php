<?php

namespace App\Http\Controllers;

use App\Configuracion;
use Illuminate\Http\Request;

class ConfiguracionController extends Controller
{
    public function setLogoVeterinaria(Request $request)
    {
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
    }

    public function setNombreDireccion(Request $request){
        $configuracion = Configuracion::find('1');
        if(!is_null($configuracion)){
            $configuracion->nombre_veterinaria = $request->nombre;
            $configuracion->direccion = $request->direccion;
            $configuracion->numero = $request->numero;
            if ($configuracion->save()) {
                return ['estado' => 'success', 'mensaje' => 'Nombre/Direccion Actualizado Correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al actualizar el Nombre/Direccion.'];
            }
        }
    }

    public function getConfiguraciones(){
        return Configuracion::all()->first();
    }
}
