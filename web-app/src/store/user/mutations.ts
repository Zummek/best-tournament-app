import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  setUser(state: UserStateInterface, user: UserStateInterface) {
    state = user;
  },
  logOut(state: UserStateInterface) {
    state.id = '';
    state.tenantId = '';
    state.name = '';
    state.username = '';
  },
};

export default mutation;
