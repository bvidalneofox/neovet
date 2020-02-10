<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estado_chip extends Model
{
    use SoftDeletes;
    protected $table = "estado_chip";
    protected $dates = ['deleted_at'];
}
