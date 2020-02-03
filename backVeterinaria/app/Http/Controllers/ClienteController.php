<?php

namespace App\Http\Controllers;

use App\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClienteController extends Controller
{
    public function setCliente(Request $request)
    {
        $cliente = new Cliente;
        $cliente->nombre = $request->nombre;
        $cliente->rut = $request->rut;
        $cliente->correo = $request->correo;
        $cliente->direccion = $request->direccion;
        $cliente->numero = $request->numero;
        $cliente->password = '123';
        $cliente->fecha_ingreso = $request->fecha_ingreso;
        if ($cliente->save()) {
            return ['estado' => 'success', 'mensaje' => 'Cliente agregado correctamente.'];
        } else {
            return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al ingresar el nuevo cliente.'];
        }
    }

    //FUNCION PARA OBTENER UN CLIENTE EN ESPECIFICO
    public function getClientePorRut($rut = '')
    {
        if ($rut == '') {
            return ['estado' => 'failed_unr', 'mensaje' => 'Debe de ingresar un rut en el buscador.'];
        } else {
            $busqueda = Cliente::select([
                'id',
                'nombre',
                'rut',
                'correo',
                'direccion',
                'numero',
                'password',
                'fecha_ingreso'
            ])
                ->where('rut', $rut)
                ->get();
            if (count($busqueda) > 0) {
                return ['estado' => 'success', 'cliente' => $busqueda[0]];
            } else {
                return ['estado' => 'failed_unr', 'mensaje' => 'El rut ingresado no existe en nuestros registros.'];
            }
        }
    }

    public function getMascotasClientePorRut($rut = '')
    {
        if ($rut != '') {
            $busqueda = DB::table('clientes as c')
                ->join('mascotas as m', 'm.id_cliente', '=', 'c.id')
                ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
                ->select('c.id as idCliente', 'm.nombre as nombreMascota', 'c.nombre as nombreDuenio', 'tm.descripcion as tipoMascota', 'm.id as mascotaId')
                ->where('c.rut', $rut)
                ->get();
            if (!$busqueda->isEmpty()) {
                return ['estado' => 'success', 'mascotas' => $busqueda];
            } else {
                return ['estado' => 'failed_unr', 'mensaje' => 'El Cliente no cuenta con mascotas registradas, revise el rut i cree que se trata de un error.'];
            }
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'Debe de ingresar un rut en el buscador.'];
        }
    }

    public function getClientesPorNombre($nombre = '')
    {
        if ($nombre != '') {
            $busqueda = DB::table('clientes as c')
                ->select('c.*')
                ->where('c.nombre', 'LIKE', '%' . $nombre . '%')
                ->get();
            if (!$busqueda->isEmpty()) {
                return ['estado' => 'success', 'clientes' => $busqueda];
            } else {
                return ['estado' => 'failed_unr', 'mensaje' => 'no se ha encontrado al cliente en la base de datos.'];
            }
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'Debe de ingresar un nombre en el buscador.'];
        }
    }

    public function getMascotasPorIdCliente($id)
    {
        $busqueda = DB::table('clientes as c')
            ->join('mascotas as m', 'm.id_cliente', '=', 'c.id')
            ->join('tipo_mascota as tm', 'tm.id', '=', 'm.id_tipo_mascota')
            ->select('c.id as idCliente', 'm.nombre as nombreMascota', 'c.nombre as nombreDuenio', 'tm.descripcion as tipoMascota', 'm.id as mascotaId')
            ->where('c.id', $id)
            ->get();
        if (!$busqueda->isEmpty()) {
            return ['estado' => 'success', 'mascotas' => $busqueda];
        } else {
            return ['estado' => 'failed_unr', 'mensaje' => 'El Cliente no cuenta con mascotas registradas, revise el rut i cree que se trata de un error.'];
        }
    }

    public function getAllClientes()
    {
        return Cliente::all();
    }
}
