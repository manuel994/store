<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});



Route::group([

], function ($router) {

    Route::get('customers', 'CustomersController@all');
    Route::get('customers/{id}', 'CustomersController@get');
    Route::post('customers/new', 'CustomersController@new');

});


Route::group([

], function ($router) {

    Route::get('users', 'UsersController@all');
    Route::get('users/{id}', 'UsersController@get');
    Route::delete('users/{id}/delete', 'UsersController@delete');
    Route::post('users/new', 'UsersController@new');
    Route::post('users/edit', 'UsersController@edit');

});


Route::group([

], function ($router) {

    Route::get('products', 'ProductsController@all');
    Route::get('products/{id}', 'ProductsController@get');
    Route::delete('products/{id}/delete', 'ProductsController@delete');
    Route::post('products/new', 'ProductsController@new');
    Route::post('products/edit', 'ProductsController@edit');
    Route::get('products/{id}/details', 'ProductsController@details');

});
