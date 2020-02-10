<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tipo_mascota extends Model
{
    use SoftDeletes;
    protected $table = "tipo_mascota";
    protected $dates = ['deleted_at'];
}
