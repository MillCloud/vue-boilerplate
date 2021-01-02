import Layout from '@/layout/index.vue';

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/index'),
      },
    ],
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home'),
      },
    ],
  },
];
