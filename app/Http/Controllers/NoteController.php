<?php

namespace App\Http\Controllers;
use App\Repositories\Notes;

class NoteController
{
    private $repository;
    public function __construct()
    {
        $this->repository = new Notes();
    }

    public function delete(\Illuminate\Http\Request $request, string $uuid)
    {
        // $validated = $request->validate([
        //     "uuid" => "required|exists:notes,id",
        // ]);

        $this->repository->remove($uuid);
        return response()->noContent();
    }

    public function store(
        \Illuminate\Http\Request $request,
    ): \Illuminate\Database\Eloquent\Collection {
        $validated = $request->validate([
            "text" => "required|string|max:50|unique:tags,name",
            "tag_id" => "required|exists:tags,id",
        ]);

        return $this->repository->store($validated);
    }
    public function load(): array
    {
        return $this->repository->load();
    }
}
