<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableMascotas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mascotas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre');
            $table->string('genero');
            $table->string('raza')->nullable();
            $table->string('color')->nullable();
            $table->date('fecha_nacimiento');
            $table->date('fecha_ingreso')->nullable();
            $table->text('numero_chip')->nullable();
            $table->string('estado_chip');
            $table->string('estado_esterilizado');
            $table->integer('id_tipo_mascota');
            $table->integer('id_cliente');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mascotas');
    }
}
