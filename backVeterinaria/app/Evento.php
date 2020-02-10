<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Evento extends Model
{
    use SoftDeletes;
    protected $fillable = ['title', 'descripcion', 'color', 'textColor', 'start', 'end'];
    protected $dates = ['deleted_at'];
}
