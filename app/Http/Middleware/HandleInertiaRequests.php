<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            // Ambil notifikasi langsung dari DB untuk Navbar
                'notifications' => $request->user() 
                ? \App\Models\Activity::latest()->take(10)->get()->map(fn($n) => [
                    'user_name' => $n->user_name,
                    'message' => $n->message,
                    'type' => $n->type,
                    'path' => $n->path,
                    'time' => $n->created_at->diffForHumans(),
                ]) 
                : [],
            // Pastikan flash selalu punya default object agar React tidak crash
            'flash' => [
                'message' => $request->session()->get('message'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}
