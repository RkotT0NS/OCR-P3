<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TagController;
use App\Http\Controllers\NoteController;

Route::middleware(["auth:sanctum"])->group(function () {
    Route::get("tags", [TagController::class, "load"]);
    Route::post("tags", [TagController::class, "store"]);

    Route::get("notes", [NoteController::class, "load"]);
    Route::post("notes", [NoteController::class, "store"]);
    Route::delete("note/{uuid}", [NoteController::class, "delete"]);
});
