import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { StateInterface } from '../store';
import routes from './routes';
import VueCookies from 'vue-cookies';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function({ Vue }) {
  Vue.use(VueRouter);
  Vue.use(VueCookies);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach((to, from, next) => {
    console.log(Vue.$cookies.get('jwt'));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (to.meta.public === true || Vue.$cookies.get('jwt') !== null) {
      next();
    } else {
      next({
        name: 'login',
        query: {
          next: to.path,
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // if (to.matched.some(record => record.meta.requiresAuth)) {
    //   // this route requires auth, check if logged in
    //   // if not, redirect to login page.
      
    //   // console.log(access_token);
    //   // // console.log(this.$cookies.isKey('jwt'));

    //   // console.log(Router.app.$cookies.isKey('jwt'));
    //   // console.log(Vue.$cookies.isKey('jwt'));
    //   // console.log($cookies.isKey('jwt'));

    //   // if (!this.$cookies.isKey("jwt")) {
    //   //   //TODO: w warunku sprawdzać ciasteczko z MS
    //   //   next({
    //   //     name: 'login',
    //   //     // query: { redirect: { name: 'TournamentCreator' } },
    //   //   });
    //   // } else {
    //   //   next();
    //   // }
    // } else {
    //   next();
    // }
  });

  return Router;
});
