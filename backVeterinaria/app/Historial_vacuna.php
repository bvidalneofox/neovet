<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Historial_vacuna extends Model
{
    //
    protected $fillable = ['fecha', 'id_mascota', 'id_vacuna'];
}
