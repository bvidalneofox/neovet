<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consulta extends Model
{
    protected $fillable = ['motivo','fecha_consulta','id_estado','id_mascota','id_usuario'];
}
