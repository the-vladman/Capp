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
Route::resource('admin/catalogo','CatalogoController');
//Predeterminado
Route::resource('admin/catalogo/{catalogo}/p','PredeterminadoController');
//Arquitecto
Route::resource('admin/catalogo/{catalogo}/a','ArquitectoController');
//Tax
Route::resource('admin/catalogo/{catalogo}/t','TaxController');
/*
//Catalogo
Route::get('admin/catalogo','CatalogoController@index');
Route::get('admin/catalogo/{id}','CatalogoController@show');
//Route::get('admin/admin/catalogo/{catalogo}/a/{id}','ArquitectoController@create');
//Route::delete('admin/catalogo/{catalogo}/a/{id}','ArquitectoController@destroy');
//Route::delete('admin/catalogo/{catalogo}/t/{id}','TaxController@destroy');

//Predeterminados
//Route::get('api/predeterminado','PredeterminadoController@index');
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
*/
//Arquitecto
//Route::get('api/arquitecto','ArquitectoController@index');
//Route::get('api/arquitecto/{id}','ArquitectoController@show');

//Tax
//Route::get('api/tax','TaxController@index');
//Route::get('api/tax/{id}','TaxController@show');

//URL DEL API
Route::get('api/v0/{id}','ApiController@acceso');
//ULR del APP
Route::get('app','AppController@index');

