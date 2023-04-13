<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function auth(Request $request)
    {
        $data = $request->all('email', 'password');
        if (!Auth::attempt($data)) {
            return response()->json([
                'message' => 'Логин или пароль не совпадают',
                'error' => true
            ], 422);
        }

        $user = Auth::user();

        $permissions = $user->allInclusivePermissionsToArray();
        $roles = $user->rolesToArray();

        return response()->json([
            'user' => $user,
            'permissions' => $permissions,
            'roles' => $roles,
            'token' => $user['api_token']
        ]);
    }
}
