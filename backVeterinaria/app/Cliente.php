<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = ['nombre','rut','correo','direccion','numero','password','fecha_ingreso'];
}
