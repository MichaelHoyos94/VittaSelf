import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import collectModuleAssetsPaths from './vite-module-loader.js';

async function getAllPaths() {
    const paths = [
        'resources/css/app.css',
        'resources/js/app.jsx',
    ];
    const allPaths = await collectModuleAssetsPaths(paths, "Modules");
    return defineConfig({
        plugins: [
            laravel({
                input: allPaths,
                ssr: 'resources/js/ssr.jsx',
                refresh: true,
            }),
            react(),
        ],
    });
}

export default getAllPaths();

/*
export default defineConfig({
    plugins: [
        laravel({
            input: allPath,
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
});*/
