<?php

namespace App\Http\Controllers;
use App\Repositories\Tags;

class TagController
{
    private $repository;
    public function __construct()
    {
        $this->repository = new Tags();
    }

    public function load()
    {
        return $this->repository->load();
    }

    public function store(
        \Illuminate\Http\Request $request,
    ): \Illuminate\Database\Eloquent\Collection {
        $validated = $request->validate([
            "name" => "required|string|max:50|unique:tags,name",
        ]);

        return $this->repository->append($validated);
    }
}
