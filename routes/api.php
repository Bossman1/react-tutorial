<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout', [\App\Http\Controllers\AuthController::class,'logout'])->name('logout');
    Route::apiResource('survey', \App\Http\Controllers\SurveyController::class);
});


Route::post('/signup', [\App\Http\Controllers\AuthController::class,'signup'])->name('signup');
Route::post('/login', [\App\Http\Controllers\AuthController::class,'login'])->name('login');

