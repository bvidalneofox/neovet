<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Historial_vacuna extends Model
{
    use SoftDeletes;
    protected $fillable = ['fecha', 'id_mascota', 'id_vacuna'];
    protected $dates = ['deleted_at'];
}
