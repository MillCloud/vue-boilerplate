import Layout from '@/layout/index.vue';

export default [
  {
    path: '*',
    component: Layout,
    children: [
      {
        path: '',
        name: '404',
        component: () => import('@/views/exception/404'),
      },
    ],
  },
];
