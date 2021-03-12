import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: { public: false },
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/NoAppLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/Login.vue'),
        meta: { public: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
