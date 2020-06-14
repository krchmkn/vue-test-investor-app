import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    name: '404 Page not found',
    component: NotFound,
  },
  {
    path: '/',
    name: 'Desktop',
    component: () => import('@/views/Desktop.vue'),
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import('@/views/Transactions.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
