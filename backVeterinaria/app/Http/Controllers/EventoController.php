<?php

namespace App\Http\Controllers;

use App\Evento;
use Illuminate\Http\Request;

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
        return Evento::all();
    }
}
