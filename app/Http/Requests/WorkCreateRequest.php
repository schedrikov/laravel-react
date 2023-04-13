<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WorkCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'date_from' => 'required|date',
            'date_to' => 'required|date',
            'user_id' => 'required|int',
            'manager_user_id' => 'required|int',
            'status' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Наименование должно быть обязательно для заполнения',
            'date_from.unique' => '"Дата от" обязательна для заполнения',
            'date_to.required' => '"Дата до" обязательна для заполнения',
            'status.required' => 'Статус обязателен для заполнения',
            'user_id.required' => 'Параметр user_id не найден',
            'manager_user_id.required' => 'Параметр manager_user_id не найден',
        ];
    }
}
