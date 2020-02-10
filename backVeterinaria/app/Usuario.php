<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Usuario extends Model
{
    use SoftDeletes;
    protected $fillable = ['nombre', 'rut', 'numero', 'direccion', 'correo', 'fecha_nacimiento', 'cargo', 'password', 'tipo_usuario'];
    protected $dates = ['deleted_at'];
}
