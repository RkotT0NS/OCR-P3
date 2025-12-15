<?php

namespace App\Repositories;
use App\Models\Note;

class Tags
{
    protected $model;

    public function __construct()
    {
        $this->model = Note::class;
    }

    public static function load(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model::pluck("name")->toArray();
    }
    public function append(
        array $data,
    ): \Illuminate\Database\Eloquent\Collection {
        $this->model::create($data);
        return $this->load();
    }
}
