<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{

    public function validarDatos($request, $idFuncion)
    {
        switch ($idFuncion) {
            case 1:
                $validator = Validator::make(
                    $request->all(),
                    [
                        'nombre' => 'required',
                        'rut' => 'required',
                        'numero' => 'required',
                        'direccion' => 'required',
                        'correo' => 'required',
                        'tipo_usuario' => 'required',
                    ],
                    [
                        'nombre.required' => 'Debe de ingresar un nombre',
                        'rut.required' => 'Debe de ingresar un rut',
                        'numero.required' => 'Debe de ingresar un numero de contacto',
                        'direccion.required' => 'Debe de ingresar una dirección',
                        'correo.required' => 'Debe de ingresar un correo',
                        'tipo_usuario.required' => 'Debe de seleccionar el tipo de usuario',
                    ]
                );
                break;

            case 2:
                $validator = Validator::make(
                    $request->all(),
                    [
                        'nombre' => 'required',
                        'rut' => 'required',
                        'numero' => 'required',
                        'direccion' => 'required',
                        'correo' => 'required',
                    ],
                    [
                        'nombre.required' => 'Debe de ingresar un nombre',
                        'rut.required' => 'Debe de ingresar un rut',
                        'numero.required' => 'Debe de ingresar un numero de contacto',
                        'direccion.required' => 'Debe de ingresar una dirección',
                        'correo.required' => 'Debe de ingresar un correo',
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

    public function setUsuario(Request $request)
    {
        $validador = $this->validarDatos($request, 1);
        if ($validador['estado'] == 'success') {
            $user = new User();
            $user->name = $request->nombre;
            $user->rut = $request->rut;
            $user->numero = $request->numero;
            $user->direccion = $request->direccion;
            $user->email = $request->correo;
            $user->password = bcrypt(substr($request->rut,0,4));
            $user->tipo_usuario = $request->tipo_usuario;
            $user->save();
            if ($user->save()) {
                return ['estado' => 'success', 'mensaje' => 'Usuario creado correctamente.'];
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al crear el Usuario.'];
            }
        } else {
            return $validador;
        }
    }

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

    public function getUsuariosSistema()
    {
        return User::withTrashed()->get();
    }

    public function updateUsuarioSistema(Request $request)
    {
        $validador = $this->validarDatos($request, 2);
        if ($validador['estado'] == 'success') {
            $cliente = User::find($request->id);
            if (!is_null($cliente)) {
                $cliente->name = $request->nombre;
                $cliente->rut = $request->rut;
                $cliente->numero = $request->numero;
                $cliente->direccion = $request->direccion;
                $cliente->email = $request->correo;
                if ($cliente->save()) {
                    return ['estado' => 'success', 'mensaje' => 'Usuario actualizado correctamente, si desea que los cambios se apliquen en el sistema debe de cerrar e iniciar sesión nuevamente.'];
                } else {
                    return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al actualizar el Usuario.'];
                }
            }
        } else {
            return $validador;
        }
    }

    public function deleteUsuario(Request $request)
    {
        if ($request->id != Auth::user()->id) {
            if ($request->metodo == 'true') {
                $evento = User::find($request->id)->delete();
                if ($evento) {
                    return ['estado' => 'success', 'mensaje' => 'Usuario Bloqueado Correctamente.'];
                } else {
                    return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al bloquear al usuario.'];
                }
            } else {
                $evento = User::withTrashed()
                    ->where('id', $request->id)
                    ->restore();
                if ($evento) {
                    return ['estado' => 'success', 'mensaje' => 'Usuario Desbloqueado Correctamente.'];
                } else {
                    return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al Desbloquear al usuario.'];
                }
            }
        } else {
            return ['estado' => 'failed', 'mensaje' => 'No se puede bloquear a si mismo.'];
        }
    }

    public function changePasswordUser(Request $request)
    {
        $cliente = User::find($request->id);
        if (!is_null($cliente)) {
            if (Hash::check($request->passwordActual, $cliente->password)) {
                $cliente->password = bcrypt($request->passwordNueva);
                if ($cliente->save()) {
                    return ['estado' => 'success', 'mensaje' => 'Contraseña actualizada correctamente.'];
                } else {
                    return ['estado' => 'failed', 'mensaje' => 'Se ha producido un error al actualizar la contraseña.'];
                }
            } else {
                return ['estado' => 'failed', 'mensaje' => 'Contraseña Actual Incorrecta.'];
            }
        }
    }
}
