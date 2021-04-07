import User from 'app/../shared/types/User';
import { MutationTree } from 'vuex';

const mutation: MutationTree<User> = {
  setUser(state, user: User) {
    console.log('HELLO', user); // tu coś nie działa
    state = user;
  },
  logOut(state) {
    state.id = '';
    state.alias = '';
    state.firstName = '';
    state.lastName = '';
    state.email = '';
    state.avatarSrc = '';
  },
};

export default mutation;
