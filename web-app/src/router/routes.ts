import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('pages/Index.vue'),
        meta: { public: true },
      },
      {
        path: '/tournamentsList',
        name: 'TournamentsList',
        component: () => import('src/pages/tournament/TournamentsList.vue'),
        meta: { public: true }, //TODO change to false
      },
      {
        path: 'tournament/:id',
        name: 'TournamentDetails',
        // component: () => import('pages/tournament/Details.vue'),
        component: () => import('pages/Index.vue'),
        meta: { public: true }, // TODO: change to false
      },
      {
        path: '/createTournament',
        name: 'TournamentCreator',
        // component: () => import('pages/tournament/TournamentCreator.vue'),
        component: () => import('pages/Index.vue'),
        meta: { public: true }, // TODO: change to false
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
    meta: { public: true },
  },
];

export default routes;
