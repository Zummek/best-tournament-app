import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/tournament/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'list',
        component: () => import('src/pages/tournament/TournamentsList.vue'),
        meta: { public: true },
      },
      {
        path: ':id/standings',
        component: () => import('src/pages/tournament/TournamentStandings.vue'),
        meta: { public: true },
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
