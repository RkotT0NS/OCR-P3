<?php

namespace App\Http\Controllers;
use App\Models\Tag;

class TagController
{
    public function listAll()
    {
        return Tag::all();
    }
}
