<?php

namespace App\Repositories;
use App\Models\Tag;

class Tags
{
    protected $model;

    public function __construct()
    {
        $this->model = Tag::class;
    }

    public function load(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model::select("id", "name")->get();
    }
    public function append(
        array $data,
    ): \Illuminate\Database\Eloquent\Collection {
        $this->model::create($data);
        return $this->load();
    }
}
