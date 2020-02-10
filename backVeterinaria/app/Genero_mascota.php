<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Genero_mascota extends Model
{
    use SoftDeletes;
    protected $table = "genero_mascota";
    protected $dates = ['deleted_at'];
}
