import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  setUser(state: UserStateInterface, user: UserStateInterface) {
    state = user;
  },
};

export default mutation;
