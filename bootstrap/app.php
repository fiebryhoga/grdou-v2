<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        
        // 1. Middleware Standar (Biarkan Inertia di sini)
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        
        $middleware->validateCsrfTokens(except: [
            'midtrans-callback',      // Jika route ada di web.php
            'api/midtrans-callback',  // Jika route ada di api.php
            'payment/notification',   // Jaga-jaga jika pakai url lain
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();