<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    public function getDatosUsuarioSistema()
    {
        $busqueda = DB::table('users as u')
            ->select('u.*')
            ->where('u.id', Auth::user()->id)
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'usuario' => $busqueda[0]];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay eventos activas de momento.'];
        }
    }

    public function updateUsuarioSistema(Request $request)
    {
        $cliente = User::find($request->id);
            if (!is_null($cliente)) {
                $cliente->name = $request->nombre;
                $cliente->rut = $request->rut;
                $cliente->numero = $request->numero;
                $cliente->direccion = $request->direccion;
                $cliente->email = $request->correo;
                if ($cliente->save()) {
                    return ['estado' => 'success', 'mensaje' => 'Usuario actualizado correctamente.'];
                } else {
                    return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al actualizar el Usuario.'];
                }
            }
    }
}
