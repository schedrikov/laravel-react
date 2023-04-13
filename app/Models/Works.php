<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Works extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date_from',
        'date_to',
        'user_id',
        'status',
        'manager_user_id',
    ];

    protected $casts = [
        'date_from' => 'datetime:d.m.Y',
        'date_to' => 'datetime:d.m.Y',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function managerUser(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'manager_user_id');
    }

}
