import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';
import removeAttribute from 'remove-attr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        server: {
            port: 3008,
        },
        plugins: [
            vue(),
            mode !== 'test'
                ? removeAttribute({
                      extensions: ['vue'],
                      attributes: ['data-testId'],
                  })
                : null,
            VitePWA({
                // Refer https://favicon.inbrowser.app/tools/favicon-generator to generate below mani fest details
                manifest: {
                    name: 'App Name',
                    short_name: 'App Name',
                    icons: [
                        {
                            src: '/vite.svg',
                            sizes: '192x192',
                            type: 'image/png',
                            purpose: 'any',
                        },
                        {
                            src: '/vite.svg',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any',
                        },
                        {
                            src: '/vite.svg',
                            sizes: '192x192',
                            type: 'image/png',
                            purpose: 'maskable',
                        },
                        {
                            src: '/vite.svg',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'maskable',
                        },
                    ],
                    start_url: '/',
                    display: 'fullscreen',
                    background_color: '#FFFFFF',
                    theme_color: '#FFFFFF',
                    description: 'App description',
                    lang: 'en',
                },
                srcDir: 'src',
                filename: 'sw.ts',
                strategies: 'injectManifest',
                registerType: 'autoUpdate',
                injectManifest: {
                    injectionPoint: undefined,
                },
            }),
        ],
        resolve: {
            alias: {
                src: __dirname + '/src',
            },
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            return id.split(/\/node_modules\/([\w-]+)\//gm)[1];
                        }
                    },
                    entryFileNames: 'assets/[name].[hash].js',
                    chunkFileNames: 'assets/[name].[hash].js',
                    assetFileNames: 'assets/[name].[hash].[ext]',
                },
            },
        },
    };
});
