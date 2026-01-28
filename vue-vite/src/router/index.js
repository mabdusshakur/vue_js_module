import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            // home route
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            // about route
            path: '/about/:name',
            name: 'about',
            component: () => import('../views/AboutPage.vue')
        },

        // 404 route
         {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/404.vue')
         }
    ]
});


export default router;