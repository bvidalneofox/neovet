<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    //
    protected $fillable = ['nombre', 'rut', 'numero', 'direccion', 'correo', 'fecha_nacimiento', 'cargo', 'password', 'tipo_usuario'];
}
