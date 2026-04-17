import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob([
            './Pages/**/*.jsx',
            '../../Modules/*/resources/assets/js/Pages/**/*.jsx',
        ]);

        const loadPage = (path) => {
            if (pages[path]) {
                return pages[path]();
            }

            return null;
        };

        const appPage = loadPage(`./Pages/${name}.jsx`);

        if (appPage) {
            return appPage;
        }

        const [moduleName, ...rest] = name.split('/');
        const relative = rest.join('/');

        if (relative) {
            const modulePage = loadPage(
                `../../Modules/${moduleName}/resources/assets/js/Pages/${relative}.jsx`
            );

            if (modulePage) {
                return modulePage;
            }
        }

        throw new Error(
            `Page not found: ${name}. Expected module pages in Modules/<Module>/resources/assets/js/Pages/**`
        );
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: 'rgb(100, 150, 100)',
    },
});
