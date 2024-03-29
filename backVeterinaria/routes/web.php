<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{angular?}', function() {
    return File::get(public_path().'/app/index.html');
})->where('angular', '.*');

Route::get('/', function () {
    return view('welcome');
});
