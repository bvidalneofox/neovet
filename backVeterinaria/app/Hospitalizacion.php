<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Hospitalizacion extends Model
{
    use SoftDeletes;
    protected $table = "hospitalizaciones";
    protected $fillable = ['seguimiento', 'estado', 'id_mascota', 'id_usuario'];
    protected $dates = ['deleted_at'];
}
