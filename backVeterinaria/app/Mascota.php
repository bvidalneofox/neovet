<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mascota extends Model
{
    use SoftDeletes;
    protected $fillable = ['nombre','genero','raza','color','fecha_nacimiento','fecha_ingreso','numero_chip','estado_chip', 'estado_esterilizado', 'id_tipo_mascota', 'id_cliente'];
    protected $dates = ['deleted_at'];
}
