<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WorksResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'date_from' => date('d.m.Y', strtotime($this->date_from)),
            'date_to' => date('d.m.Y', strtotime($this->date_to)),
            'user_id' => $this->user_id,
            'user' => $this->user,
            'status' => $this->status,
            'manager_user_id' => $this->manager_user_id,
            'manager_user' => $this->managerUser,
        ];
    }
}
