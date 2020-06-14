import NotFound from '@/views/NotFound.vue';

export default [
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
