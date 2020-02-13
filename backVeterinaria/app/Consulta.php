<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Consulta extends Model
{
    use SoftDeletes;
    protected $fillable = ['motivo','fecha_consulta','id_estado','id_mascota','id_usuario'];
    protected $dates = ['deleted_at'];
}