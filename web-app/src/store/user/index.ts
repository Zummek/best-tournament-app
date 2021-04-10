import { Module } from 'vuex';
import { StateInterface } from '../index';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import User from 'app/../shared/types/User';

const userModule: Module<User, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default userModule;
