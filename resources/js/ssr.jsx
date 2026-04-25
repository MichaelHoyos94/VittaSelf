import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { route } from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
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
        setup: ({ App, props }) => {
            global.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });

            return <App {...props} />;
        },
    })
);
