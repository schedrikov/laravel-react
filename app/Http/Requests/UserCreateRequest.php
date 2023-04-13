<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
{
    protected $redirected = false;

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
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Имя должно быть обязательно для заполнения',
            'email.required' => 'Email Имя обязателен для заполнения',
            'email.unique' => 'Такой email уже используется',
            'password.required' => 'Пароль должен быть обязательн для заполнения',
        ];
    }
}
