import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import('src/app/pages/main.vue'),
        },
        {
            path: '/sign-in',
            name: 'signIn',
            component: () => import('src/app/pages/authentication/signIn.vue'),
        },
        {
            path: '/sign-up',
            name: 'signUp',
            component: () => import('src/app/pages/authentication/signUp.vue'),
        },
        {
            path: '/forgot-password',
            name: 'forgotPassword',
            component: () =>
                import('src/app/pages/authentication/forgotPassword.vue'),
        },
        {
            path: '/reset-password',
            name: 'resetPassword',
            component: () =>
                import('src/app/pages/authentication/resetPassword.vue'),
        },
        {
            path: '/verify',
            name: 'verification',
            component: () =>
                import('src/app/pages/authentication/verification.vue'),
            meta: {
                defaultDomain: true,
            },
            props: {
                content: 'Account verified',
            },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('src/app/components/page.vue'),
            meta: {
                defaultDomain: true,
            },
            props: {
                content: '404 Page Not Found',
            },
        },
    ],
});

export default router;
