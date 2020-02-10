<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use SoftDeletes;
    protected $fillable = ['nombre','rut','correo','direccion','numero','password','fecha_ingreso'];
    protected $dates = ['deleted_at'];
}
