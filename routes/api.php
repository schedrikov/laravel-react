<?php

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
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('/auth', 'auth');
});

Route::prefix('v1')->middleware('authBearer')->group(function () {

    Route::controller(UsersController::class)->group(function () {
        Route::get('/users/info', 'info');
        Route::get('/users', 'index');
        Route::get('/users/{id}', 'show');
        Route::post('/users', 'store');
        Route::match(['put', 'patch'],'/users/{id}', 'update');
        Route::delete('/users/{id}', 'destroy');
    });

    Route::controller(WorksController::class)->group(function () {
        Route::get('/works', 'index');
        Route::get('/works/{id}', 'show');
        Route::post('/works', 'store');
        Route::match(['put', 'patch'],'/works/{id}', 'update');
        Route::delete('/works/{id}', 'destroy');
    });

});
