import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    //resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    resolve: async (name) => {
        const pages = import.meta.glob([
            './Pages/**/*.jsx',
            '../../Modules/*/resources/js/Pages/**/*.jsx',
        ]);

        // 1. Buscar en app principal
        if (pages[`./Pages/${name}.jsx`]) {
            return pages[`./Pages/${name}.jsx`]();
        }

        // 2. Buscar en módulos
        const [moduleName, ...rest] = name.split('/');
        const relative = rest.join('/');

        const modulePath = `../../Modules/${moduleName}/resources/js/Pages/${relative}.jsx`;

        if (pages[modulePath]) {
            return pages[modulePath]();
        }

        throw new Error(`Page not found: ${name}`);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: 'rgb(100, 150, 100)',
    },
});
