<?php

namespace App\Http\Controllers;

use App\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EventoController extends Controller
{
    public function setEvento(Request $request)
    {
        $evento = new Evento();
        $evento->title = $request->title;
        $evento->descripcion = $request->descripcion;
        $evento->color = $request->color;
        $evento->textColor = $request->textColor;
        $evento->start = $request->start;
        $evento->end = $request->end;
        $evento->id_usuario = Auth::user()->id;
        if ($evento->save()) {
            return ['estado' => 'success', 'mensaje' => 'Evento agregado correctamente.'];
        } else {
            return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al ingresar el evento.'];
        }
    }

    public function updateEvento(Request $request)
    {
        $evento = Evento::find($request->id);
        if (!is_null($evento)) {
            $evento->title = $request->title;
            $evento->descripcion = $request->descripcion;
            $evento->color = $request->color;
            $evento->textColor = $request->textColor;
            $evento->start = $request->start;
            $evento->end = $request->end;
            if ($evento->save()) {
                return ['estado' => 'success', 'mensaje' => 'Evento ACtualizado Correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al actualzar el evento.'];
            }
        } else {
            return ['estado' => 'failed', 'mensaje' => 'No se ha encontrado el evento solicitado.'];
        }
    }

    public function getEventos()
    {
        // $busqueda = DB::table('eventos as e')
        //     ->select('e.*', 'u.name as nombreCreador')
        //     ->leftJoin('users as u', 'u.id', '=', 'e.id_usuario')
        //     ->get();
        // $busqueda = Evento::all();
        $busqueda = Evento::select('eventos.*', 'users.name as nombreCreador')
        ->leftJoin('users', 'users.id', '=', 'eventos.id_usuario')
        ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'eventos' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay eventos activas de momento.'];
        }
    }

    // public function getEventos()
    // {
    //     return Evento::all();
    // }

    public function deleteEvento(Request $request)
    {
        $evento = Evento::find($request->id)->delete();
        if ($evento) {
            return ['estado' => 'success', 'mensaje' => 'Evento Eliminado Correctamente.'];
        } else {
            return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al eliminar el evento.'];
        }
    }
}
