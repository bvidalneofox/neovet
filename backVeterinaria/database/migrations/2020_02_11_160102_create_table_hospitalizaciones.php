<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableHospitalizaciones extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hospitalizaciones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('motivo');
            $table->text('seguimiento')->nullable();
            $table->integer('id_estado');
            $table->integer('id_mascota');
            $table->integer('id_usuario');
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
        Schema::dropIfExists('hospitalizaciones');
    }
}
