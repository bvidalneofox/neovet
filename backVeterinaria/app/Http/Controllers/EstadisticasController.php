<?php

namespace App\Http\Controllers;

use App\Consulta;
use Illuminate\Support\Facades\DB;

class EstadisticasController extends Controller
{
    public function getClientesSistema(){
        $clientes = DB::table('clientes')
                 ->select(DB::raw('COUNT(id) numeroClientes'))
                 ->get();
        if (!$clientes->isEmpty()) {
            return ['estado' => 'success', 'clientes' => $clientes[0]];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay registro de clientes'];
        }
    }

    public function getUsuariosSistema(){
        $usuarios = DB::table('users')
                 ->select(DB::raw('COUNT(id) numeroUsuarios'))
                 ->get();
        if (!$usuarios->isEmpty()) {
            return ['estado' => 'success', 'usuarios' => $usuarios[0]];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay registro de clientes'];
        }
    }

    public function getMascotasSistema(){
        $mascotas = DB::table('mascotas')
                 ->select(DB::raw('COUNT(id) numeroMascotas'))
                 ->get();
        if (!$mascotas->isEmpty()) {
            return ['estado' => 'success', 'mascotas' => $mascotas[0]];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay registro de clientes'];
        }
    }

    public function getEstadisticasConsultas(){
        $consultas = DB::table('consultas')
                 ->select(DB::raw('Year(created_at) anio, Month(created_at) as mes, COUNT(id) numeroConsultas'))
                 ->groupBy('anio','mes')
                 ->get();
        if (!$consultas->isEmpty()) {
            return ['estado' => 'success', 'consultas' => $consultas];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay registro de consultas'];
        }
    }

    public function getEstadisticasHospitalizaciones(){
        $hospitalizaciones = DB::table('hospitalizaciones')
                 ->select(DB::raw('Year(created_at) anio, Month(created_at) as mes, COUNT(id) numerohospitalizaciones'))
                 ->groupBy('anio','mes')
                 ->get();
        if (!$hospitalizaciones->isEmpty()) {
            return ['estado' => 'success', 'hospitalizaciones' => $hospitalizaciones];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay registro de hospitalizaciones'];
        }
    }

    public function getusuariosConMasProcedimientos(){
        $consultas = DB::table('consultas as c')
        ->select(DB::raw('COUNT(c.id) as numeroAtenciones, c.id_usuario_procedimiento, u.name'))
        ->leftJoin('users as u','u.id','c.id_usuario_procedimiento')
        ->groupBy('c.id_usuario_procedimiento', 'u.name')
        ->get();
        return $consultas;
        if (!$consultas->isEmpty()) {
            return ['estado' => 'success', 'consultas' => $consultas];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay registro de consultas'];
        }
    }

    public function getEstadisticasClientes(){
        $clientes = DB::table('clientes')
        ->select(DB::raw('Year(created_at) anio, Month(created_at) as mes, COUNT(id) numeroClientes'))
        ->groupBy('anio','mes')
        ->get();
        if (!$clientes->isEmpty()) {
            return ['estado' => 'success', 'clientes' => $clientes];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay registro de clientes'];
        }
    }

    public function getEstadisticasMascotas(){
        $mascotas = DB::table('mascotas')
        ->select(DB::raw('Year(created_at) anio, Month(created_at) as mes, COUNT(id) numeroMascotas'))
        ->groupBy('anio','mes')
        ->get();
        if(!$mascotas->isEmpty()){
            return ['estado' => 'success', 'mascotas' => $mascotas];
        }else{
            return ['estado' => 'failed_unr', 'mensaje' => 'No hay registro de mascotas'];
        }
    }
    
}
