<?php

namespace App\Repositories;
use Illuminate\Support\Facades\Auth;
use App\Models\Note;

class Notes
{
    protected $model;

    public function __construct()
    {
        $this->model = Note::class;
    }

    public function remove(string $reference): void
    {
        $this->model
            ::where("id", $reference)
            ->where("user_id", Auth::id())
            ->delete();
    }
    /**
     * @param array $details
     */
    public function append(
        array $details,
    ): \Illuminate\Database\Eloquent\Collection {
        $this->model::create([
            "user_id" => Auth::id(),
            "tag_id" => $details["tag_id"],
            "text" => $details["text"],
        ]);
        return $this->load();
    }

    /**
     * Load notes owned by the current user
     */
    public function load(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ::select("tag_id", "text")
            ->where("user_id", Auth::id())
            ->latest()
            ->get();
    }
}
