<?php

namespace App\Http\Controllers;
use App\Models\Tag;

class TagController
{
    public function listAll()
    {
        return Tag::pluck("name")->toArray();
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string|max:50|unique:tags,name",
        ]);
        Tag::create($validated);

        return Tag::pluck("name")->toArray();
    }
}
