import User from 'app/../shared/types/User';
import { MutationTree } from 'vuex';

const mutation: MutationTree<User> = {
  setUser(state, user: User) {
    state.id = user.id;
    state.alias = user.alias;
    state.firstName = user.firstName;
    state.lastName = user.lastName;
    state.email = user.email;
    state.avatarSrc = user.avatarSrc;
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
