<?php

namespace App\Http\Controllers;

use App\Consulta;
use App\Hospitalizacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ConsultaController extends Controller
{
    public function validarDatos($request, $idFuncion)
    {
        switch ($idFuncion) {
            case 1:
                $validator = Validator::make(
                    $request->all(),
                    [
                        'motivo' => 'required|min:1',
                        'nivel_emergencia' => 'required|min:1'
                    ],
                    [
                        'motivo.required' => 'Debe de ingresar un motivo',
                        'nivel_emergencia.required' => 'Debe de seleccionar un nivel de Emergencia',
                    ]
                );
                break;
            case 2:
                $validator = Validator::make(
                    $request->all(),
                    [
                        'procedimiento' => 'required|min:1',
                    ],
                    [
                        'procedimiento.required' => 'Debe de ingresar un procedimiento',
                    ]
                );
                break;
            case 3:
                $validator = Validator::make(
                    $request->all(),
                    [
                        'motivoHospitalizacion' => 'required|min:1',
                        'numero_camilla' => 'required|min:1'
                    ],
                    [
                        'motivoHospitalizacion.required' => 'Debe de ingresar un motivo de hospitalización',
                        'numero_camilla.required' => 'Debe de ingresar en que camilla quedara hospitalizado el paciente',
                    ]
                );
                break;
            default:
                # code...
                break;
        }

        if ($validator->fails()) {
            return ['estado' => 'failed_v', 'mensaje' => $validator->errors()];
        }
        return ['estado' => 'success', 'mensaje' => 'success'];
    }

    public function setConsulta(Request $request)
    {
        $validador = $this->validarDatos($request, 1);
        if ($validador['estado'] == 'success') {
            $consulta = new Consulta();
            $consulta->peso = '';
            $consulta->motivo = $request->motivo;
            $consulta->procedimiento = '';
            $consulta->fecha_consulta = $request->fecha_consulta;
            $consulta->nivel_emergencia = $request->nivel_emergencia;
            $consulta->nombre_cliente_solicita = $request->nombre_cliente_solicita;
            $consulta->id_estado = '1';
            $consulta->id_mascota = $request->id_mascota;
            $consulta->id_usuario = Auth::user()->id;
            if ($consulta->save()) {
                return ['estado' => 'success', 'mensaje' => 'consulta creada correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al crear la consulta.'];
            }
        } else {
            return $validador;
        }
    }

    public function getUltimasConsultasPorIdMascota($id)
    {
        $busqueda = DB::table('consultas as c')
            ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->join('users as u', 'u.id', '=', 'c.id_usuario')
            ->select('c.*', 'm.nombre as nombreMascota', 'm.id as idMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota', 'u.name as nombreEncargado')
            ->where('c.id_mascota', '=', $id)
            ->take(5)
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'consultas' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas activas de momento.'];
        }
    }

    public function getConsultasActivas($estado)
    {
        if($estado == '1'){
            $orderBy = 'nivel_emergencia';
        }else{
            $orderBy = 'created_at';
        }
        $busqueda = DB::table('consultas as c')
            ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->select('c.*', 'm.nombre as nombreMascota', 'm.id as idMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
            ->where('c.id_estado', '=', '1')
            ->orderBy($orderBy, 'asc')
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'consultas' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas activas de momento.'];
        }
    }

    public function getConsultasInactivas()
    {
        $busqueda = DB::table('consultas as c')
            ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->select('c.*', 'm.nombre as nombreMascota', 'm.id as idMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
            ->where('c.id_estado', '=', '2')
            ->orWhere('c.id_estado', '=', '3')
            ->orderBy('created_at', 'desc')
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'consultas' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas Inactivas de momento.'];
        }
    }

    public function getConsultaPorId($id)
    {
        $busqueda = DB::table('consultas as c')
            ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->join('users as u', 'u.id', '=', 'c.id_usuario')
            ->leftJoin('users as u2', 'u2.id', '=', 'c.id_usuario_procedimiento')
            ->select('c.*', 'm.nombre as nombreMascota', 'm.id as idMascota', 'm.fecha_nacimiento', 'cl.nombre as nombreDuenio', 'cl.numero', 'cl.rut', 'tm.descripcion as tipoMascota', 'u.name as nombreVetHosp', 'u2.name as nombreVetProcedimiento')
            ->where('c.id', '=', $id)
            ->get();
        if (!$busqueda->isEmpty()) {
            $anio = intval(Carbon::parse($busqueda[0]->fecha_nacimiento)->format('Y'));
            $dia =  intval(Carbon::parse($busqueda[0]->fecha_nacimiento)->format('d'));
            $mes = intval(Carbon::parse($busqueda[0]->fecha_nacimiento)->format('m'));
            $busqueda[0]->fecha_nacimiento = Carbon::createFromDate($anio, $mes, $dia)->diff(Carbon::now())->format('%y Año/s %m Mes/es y %d Dia/s');
            return ['estado' => 'success', 'consultas' => $busqueda[0]];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas Inactivas de momento.'];
        }
    }

    public function getConsultasInactivasPorRangoFecha($fechaIni = '', $fechaFini = '')
    {
        if ($fechaIni != '' && $fechaFini != '') {
            $busqueda = DB::table('consultas as c')
                ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
                ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
                ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
                ->select('c.*', 'm.nombre as nombreMascota', 'm.id as idMascota', 'cl.nombre as nombreDuenio', 'tm.descripcion as tipoMascota')
                ->whereBetween('c.created_at', [$fechaIni . ' 00:00:00', $fechaFini . ' 23:59:59'])
                ->where('c.id_estado', '=', '2')
                ->orWhere('c.id_estado', '=', '3')
                ->orderBy('created_at', 'desc')
                ->get();
            if (!$busqueda->isEmpty()) {
                return ['estado' => 'success', 'consultas' => $busqueda];
            } else {
                return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas Inactivas en las fechas solicitadas.'];
            }
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'Debe de seleccionar una fecha de Inicio y fecha de termino para filtrar.'];
        }
    }

    public function getConsultasInactivaPorIdMascota($id)
    {
        $busqueda = DB::table('consultas as c')
            ->join('mascotas as m', 'm.id', '=', 'c.id_mascota')
            ->join('clientes as cl', 'cl.id', '=', 'm.id_cliente')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->join('genero_mascota as gm', 'gm.id', '=', 'm.genero')
            ->join('users as u', 'u.id', 'c.id_usuario')
            ->select('c.*', 'm.nombre as nombreMascota', 'm.fecha_nacimiento as fechaNacimientoMascota', 'm.raza', 'gm.descripcion as generoMawscota', 'm.color', 'm.created_at as fechaIngresoMascota', 'm.id as idMascota', 'cl.nombre as nombreDuenio', 'cl.direccion', 'cl.numero', 'cl.correo', 'cl.rut', 'cl.created_at as fechaIngresoDuenio', 'tm.descripcion as tipoMascota', 'u.name as nombreVeterinario')
            ->where('c.id_estado', '=', '2')
            ->where('m.id', '=', $id)
            ->get();
        if (count($busqueda) > 0) {
            //OBTENER EDAD
            $anio = intval(Carbon::parse($busqueda[0]->fechaNacimientoMascota)->format('Y'));
            $dia =  intval(Carbon::parse($busqueda[0]->fechaNacimientoMascota)->format('d'));
            $mes = intval(Carbon::parse($busqueda[0]->fechaNacimientoMascota)->format('m'));
            $edad = Carbon::createFromDate($anio, $mes, $dia)->diff(Carbon::now())->format('%y Año/s %m Mes/es y %d Dia/s');
            foreach ($busqueda as $key) {
                setlocale(LC_TIME, 'es');
                $key->created_at = Carbon::parse($key->created_at)->formatLocalized('%d %B del %Y');
            }
        }
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'consultas' => $busqueda, 'datosBasicos' => $busqueda[0], 'edad' => $edad];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay Consultas Inactivas de momento.'];
        }
    }

    public function setProcedimientoConsulta(Request $request)
    {
        $validador = $this->validarDatos($request, 2);
        if ($validador['estado'] == 'success') {
            $consulta = Consulta::find($request->id);
            if (!is_null($consulta)) {
                $consulta->peso = $request->peso;
                $consulta->procedimiento = $request->procedimiento;
                $consulta->id_usuario_procedimiento = Auth::user()->id;
                if ($consulta->save()) {
                    if ($request->checkHospitalizacion == 'true') {
                        $validador = $this->validarDatos($request, 3);
                        if ($validador['estado'] == 'success') {
                            $hosp = new Hospitalizacion();
                            $hosp->numero_camilla = $request->numero_camilla;
                            $hosp->motivo = $request->motivoHospitalizacion;
                            $hosp->id_estado = '1';
                            $hosp->id_mascota = $request->idMascota;
                            $hosp->id_usuario = Auth::user()->id;
                            if ($hosp->save()) {
                                $this->setConsultaFinalizada($request);
                                return ['estado' => 'successDerivacion', 'mensaje' => 'Procedimiento con Hospitalizacion agregado correctamente.'];
                            } else {
                                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al ingresar el procedimiento con hospitalizacion.'];
                            }
                        } else {
                            return $validador;
                        }
                    } else {
                        return ['estado' => 'success', 'mensaje' => 'procedimiento agregado correctamente.'];
                    }
                } else {
                    return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al ingresar el procedimiento.'];
                }
            } else {
                return ['estado' => 'failed', 'mensaje' => 'No se ha encontrado al consulta solicitada.'];
            }
        } else {
            return $validador;
        }
    }

    public function setConsultaFinalizada(Request $request)
    {
        $consulta = Consulta::find($request->id);
        if (!is_null($consulta)) {
            $consulta->id_estado = '2';
            if ($consulta->save()) {
                return ['estado' => 'success', 'mensaje' => 'Consulta Finalizada Correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al finalizar la consulta.'];
            }
        } else {
            return ['estado' => 'failed', 'mensaje' => 'No se ha encontrado al consulta solicitada.'];
        }
    }

    public function cambiarEstadoConsulta(Request $request)
    {
        $consulta = Consulta::find($request->id);
        if (!is_null($consulta)) {
            if ($request->metodo == 'cancelar') {
                $consulta->id_estado = '3';
            } else {
                $consulta->id_estado = '1';
            }
            if ($consulta->save()) {
                return ['estado' => 'success', 'mensaje' => 'Estado Consulta cambiado Correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al cambiar el estado de la consulta.'];
            }
        } else {
            return ['estado' => 'failed', 'mensaje' => 'No se ha encontrado la consulta solicitada.'];
        }
    }
}
