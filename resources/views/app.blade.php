<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @php
            $component = $page['component'];
            $segments = explode('/', $component);
            $modulePagePath = null;
            $appPagePath = "resources/js/Pages/{$component}.jsx";

            if (count($segments) > 1) {
                $module = array_shift($segments);
                $candidateModulePagePath = "Modules/{$module}/resources/assets/js/Pages/" . implode('/', $segments) . '.jsx';

                if (file_exists(base_path($candidateModulePagePath))) {
                    $modulePagePath = $candidateModulePagePath;
                }
            }
        @endphp
        @vite(array_filter([
            'resources/js/app.jsx',
            $modulePagePath ?? $appPagePath,
        ]))
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
