<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estado_consulta extends Model
{
    use SoftDeletes;
    protected $table = "estado_consulta";
    protected $dates = ['deleted_at'];
}
