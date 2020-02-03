<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mascota extends Model
{
    protected $fillable = ['nombre','genero','raza','color','fecha_nacimiento','fecha_ingreso','estado_chip', 'estado_esterilizado', 'id_tipo_mascota', 'id_cliente'];
}
