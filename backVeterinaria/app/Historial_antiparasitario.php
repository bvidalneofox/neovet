<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Historial_antiparasitario extends Model
{
    use SoftDeletes;
    protected $fillable = ['nombre_antiparasitario', 'id_mascota'];
    protected $dates = ['deleted_at'];
}
