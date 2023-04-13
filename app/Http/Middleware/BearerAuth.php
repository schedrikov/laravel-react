<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class BearerAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $authorization = $request->headers->get('authorization');

        if ($authorization) {
            $position = strrpos($authorization, 'Bearer ');

            if ($position !== false) {
                $apiToken = substr($authorization, $position + 7);
                $user = User::where(['api_token' => $apiToken])->first();

                if ($user) {
                    return $next($request);
                }
            }
        }

        return response()->json([
            'message' => 'Не найден или неправильный токен авторизации',
            'error' => true
        ], 200);
    }
}
