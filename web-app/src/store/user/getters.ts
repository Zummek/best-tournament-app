import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const getters: GetterTree<UserStateInterface, StateInterface> = {
  id(state: UserStateInterface) {
    return state.id;
  },
  tenantId(state: UserStateInterface) {
    return state.tenantId;
  },
  name(state: UserStateInterface) {
    return state.name;
  },
  username(state: UserStateInterface) {
    return state.username;
  },
};

export default getters;
