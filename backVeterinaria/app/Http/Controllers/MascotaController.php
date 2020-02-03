<?php

namespace App\Http\Controllers;

use App\Mascota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MascotaController extends Controller
{
    public function setMascota(Request $request)
    {
        $mascota = new Mascota();
        $mascota->nombre = $request->nombre;
        $mascota->genero = $request->genero;
        $mascota->raza = $request->raza;
        $mascota->color = $request->color;
        $mascota->fecha_nacimiento = $request->fecha_nacimiento;
        $mascota->fecha_ingreso = $request->fecha_ingreso;
        $mascota->estado_chip = $request->estado_chip;
        $mascota->estado_esterilizado = $request->estado_esterilizado;
        $mascota->id_tipo_mascota = $request->id_tipo_mascota;
        $mascota->id_cliente = $request->id_cliente;
        if ($mascota->save()) {
            return ['estado' => 'success', 'mensaje' => 'mascota agregada correctamente.'];
        } else {
            return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al ingresar la mascota.'];
        }
    }

    public function getMascotaPorId($id)
    {
        $busqueda = DB::table('mascotas as m')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->join('genero_mascota as gm', 'gm.id', '=', 'm.genero')
            ->join('estado_chip as ec', 'ec.id', '=', 'm.estado_chip')
            ->join('estado_esterilizacion as ee', 'ee.id', '=', 'm.estado_esterilizado')
            ->select('m.*', 'tm.descripcion as tipoMascota', 'ec.descripcion as estadoChip', 'ee.descripcion as estadoEsterilizacion', 'gm.descripcion as sexo')
            ->where('m.id', $id)
            ->get();
        if (count($busqueda) > 0) {
            return ['estado' => 'success', 'mascota' => $busqueda[0]];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No se ha encontrado el id de la mascota.'];
        }
    }

    public function getMascotasPorNombre($nombre = '')
    {
        if ($nombre != '') {
            $busqueda = DB::table('mascotas as m')
                ->join('clientes as c', 'c.id', '=', 'm.id_cliente')
                ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
                ->select('m.*', 'c.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
                ->where('m.nombre', 'LIKE', '%' . $nombre . '%')
                ->get();
            if (!$busqueda->isEmpty()) {
                return ['estado' => 'success', 'mascotas' => $busqueda];
            } else {
                return ['estado' => 'failed_unr', 'mensaje' => 'El Cliente no cuenta con mascotas registradas, revise el rut i cree que se trata de un error.'];
            }
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'Debe de ingresar un nombre en el buscador.'];
        }
    }

    public function getAllMascotas()
    {
        return Mascota::all();
    }
}
