import Vuex from 'vuex';
import userModule from './user';
import Vue from 'vue';
import User from 'app/../shared/types/User';
import createPersistedState from 'vuex-persistedstate';

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  currentUser: User;
}

Vue.use(Vuex);

export default new Vuex.Store<StateInterface>({
  modules: {
    currentUser: userModule,
  },
  plugins: [
    createPersistedState({
      paths: ['currentUser'],
    }),
  ],

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: !!process.env.DEBUGGING,
});
