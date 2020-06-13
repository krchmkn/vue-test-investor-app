import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '@/views/NotFound.vue';
import Desktop from '@/views/Desktop.vue';

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
    component: Desktop,
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
