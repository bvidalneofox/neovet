<?php

namespace App\Http\Controllers;

use App\Mascota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class MascotaController extends Controller
{

    public function validarDatos($request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'nombre' => 'required|min:1',
                'raza' => 'required|unique:clientes,rut',
                'fecha_nacimiento' => 'required|min:1',
                'genero' => 'required',
                'estado_chip' => 'required',
                'estado_esterilizado' => 'required',
            ],
            [
                'nombre.required' => 'Debe de ingresar un nombre',
                'raza.required' => 'El rut del cliente es necesario',
                'fecha_nacimiento.required' => 'Es necesario un numero del cliente',
                'genero.required' => 'Debe de seleccionar genero de la mascota',
                'estado_chip.required' => 'Debe de seleccionar si la mascota esta esterilizada o no'
            ]
        );


        if ($validator->fails()) {
            return ['estado' => 'failed_v', 'mensaje' => $validator->errors()];
        }
        return ['estado' => 'success', 'mensaje' => 'success'];
    }

    public function setMascota(Request $request)
    {
        $validador = $this->validarDatos($request);
        if ($validador['estado'] == 'success') {
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
        } else {
            return $validador;
        }
    }

    public function updateMascota(Request $request)
    {
        $validador = $this->validarDatos($request);
        $mascota = Mascota::find($request->id);
        if ($validador['estado'] == 'success') {
            if (!is_null($mascota)) {
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
                    return ['estado' => 'success', 'mensaje' => 'mascota actualizada correctamente.'];
                } else {
                    return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al actualizar la mascota.'];
                }
            }
        } else {
            return $validador;
        }
    }

    public function updateDuenioMascota(Request $request)
    {
        $validador = $this->validarDatos($request);
        $mascota = Mascota::find($request->id);
            if (!is_null($mascota)) {
                $mascota->id_cliente = $request->id_cliente;
                if ($mascota->save()) {
                    return ['estado' => 'success', 'mensaje' => 'Dueño cambiado correctamente.'];
                } else {
                    return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al cambiar de dueño.'];
                }
            }
    }

    public function getMascotaPorId($id)
    {
        $busqueda = DB::table('mascotas as m')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->join('genero_mascota as gm', 'gm.id', '=', 'm.genero')
            ->join('estado_chip as ec', 'ec.id', '=', 'm.estado_chip')
            ->join('estado_esterilizacion as ee', 'ee.id', '=', 'm.estado_esterilizado')
            ->join('clientes as c', 'c.id', '=', 'm.id_cliente')
            ->select('m.*', 'tm.descripcion as tipoMascota', 'ec.descripcion as estadoChip', 'ee.descripcion as estadoEsterilizacion', 'gm.descripcion as sexo', 'c.nombre as nombreDuenio', 'c.numero as contactoDuenio', 'c.direccion as direccionDuenio', 'c.correo as correoDuenio', 'c.rut as rutDuenio', 'c.created_at as registroDuenio')
            ->where('m.id', $id)
            ->get();
        if (count($busqueda) > 0) {
            $anio = intval(Carbon::parse($busqueda[0]->fecha_nacimiento)->format('Y'));
            $dia =  intval(Carbon::parse($busqueda[0]->fecha_nacimiento)->format('d'));
            $mes = intval(Carbon::parse($busqueda[0]->fecha_nacimiento)->format('m'));
            $busqueda[0]->edad = Carbon::createFromDate($anio, $mes, $dia)->diff(Carbon::now())->format('%y Año/s %m Mes/es y %d Dia/s');
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
                ->orWhere('c.nombre', 'LIKE', '%' . $nombre . '%')
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

    public function getPesoMascotaUltimosControles($id){
        $busqueda = DB::table('consultas as c')
                ->select('c.peso', 'c.created_at')
                ->where('c.id_mascota', $id)
                ->orderBy('c.created_at', 'asc')
                ->take(6)
                ->get();
            if (!$busqueda->isEmpty()) {
                return ['estado' => 'success', 'peso' => $busqueda];
            } else {
                return ['estado' => 'failed_unr', 'mensaje' => 'El Cliente no cuenta con mascotas registradas, revise el rut i cree que se trata de un error.'];
            }
    }
}
