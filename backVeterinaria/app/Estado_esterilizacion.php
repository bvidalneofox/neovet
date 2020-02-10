<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estado_esterilizacion extends Model
{
    use SoftDeletes;
    protected $table = "estado_esterilizacion";
    protected $dates = ['deleted_at'];
}
