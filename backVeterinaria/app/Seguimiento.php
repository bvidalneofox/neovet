<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Seguimiento extends Model
{
    use SoftDeletes;
    protected $fillable = ['descripcion', 'ruta_archivo', 'id_usuario', 'id_hospitalizacion'];
    protected $dates = ['deleted_at'];
}
