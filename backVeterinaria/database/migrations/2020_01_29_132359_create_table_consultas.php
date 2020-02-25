<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableConsultas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consultas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('peso')->nullable();
            $table->string('motivo');
            $table->string('procedimiento')->nullable();
            $table->date('fecha_consulta')->nullable();
            $table->integer('id_estado');
            $table->integer('id_mascota');
            $table->integer('id_usuario');
            $table->integer('id_usuario_procedimiento')->nullable();
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
        Schema::dropIfExists('consultas');
    }
}
