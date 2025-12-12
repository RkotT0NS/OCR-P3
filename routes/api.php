<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagController;

Route::middleware(["auth:sanctum"])->group(function () {
    Route::get("tags", [TagController::class, "listAll"]);
    Route::post("tags", [TagController::class, "store"]);
});
