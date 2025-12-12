<?php

namespace App\Http\Controllers;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;

class NoteController
{
    public function listAll()
    {
        return Note::select("tag_id", "text")
            ->where("user_id", Auth::id())
            ->latest()
            ->get();
    }
}
