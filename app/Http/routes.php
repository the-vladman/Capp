<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//Catalogo
Route::get('api/catalogo','CatalogoController@index');
Route::get('api/catalogo/{id}','CatalogoController@show');
//Predeterminados
Route::get('api/predeterminado','PredeterminadoController@index');
Route::get('api/predeterminado/{id}','PredeterminadoController@show');
//Escoger
Route::get('api/escoger','EscogerController@index');
Route::get('api/escoger/{id}','EscogerController@show');
//Escogeroptions
Route::get('api/escogerop','EscogerOptionsController@index');
Route::get('api/escogerop/{id}','EscogerOptionsController@show');
//Opcional
Route::get('api/opcional','OpcionalController@index');
Route::get('api/opcional/{id}','OpcionalController@show');
//Opcionaloptions
Route::get('api/opcionalop','OpcionalOptionsController@index');
Route::get('api/opcionalop/{id}','OpcionalOptionsController@show');
//Arquitecto
Route::get('api/arquitecto','ArquitectoController@index');
Route::get('api/arquitecto/{id}','ArquitectoController@show');
//Tax
Route::get('api/tax','TaxController@index');
Route::get('api/tax/{id}','TaxController@show');

//URL DEL API
Route::get('api/v0/{id}','ApiController@acceso');
//ULR del APP
Route::get('app','AppController@index');

