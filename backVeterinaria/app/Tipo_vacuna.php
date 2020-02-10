<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tipo_vacuna extends Model
{
    use SoftDeletes;
    protected $table = "tipo_vacunas";
    protected $dates = ['deleted_at'];
}
