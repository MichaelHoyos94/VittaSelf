<?php

use Illuminate\Support\Facades\Route;
use Tests\TestCase;

uses(TestCase::class);

it('redirects back with a flash error for an unhandled exception', function () {
    $this->app->detectEnvironment(fn () => 'production');

    Route::middleware('web')->get('/testing/unhandled-exception', function () {
        throw new RuntimeException('Unexpected test exception.');
    });

    $response = $this
        ->from('/orders/create-order')
        ->get('/testing/unhandled-exception');

    $response
        ->assertRedirect('/orders/create-order')
        ->assertSessionHas('error', 'Something went wrong!');
});

it('keeps the laravel exception response outside production', function () {
    $this->app->detectEnvironment(fn () => 'local');

    Route::middleware('web')->get('/testing/local-unhandled-exception', function () {
        throw new RuntimeException('Unexpected local test exception.');
    });

    $this->get('/testing/local-unhandled-exception')
        ->assertInternalServerError()
        ->assertSessionMissing('error');
});
