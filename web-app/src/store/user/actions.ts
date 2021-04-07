import User from 'app/../shared/types/User';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import * as jwt from 'jsonwebtoken';

interface MSJWTToken {
  family_name: string;
  given_name: string;
  upn: string;
  oid: string;
}

const actions: ActionTree<User, StateInterface> = {
  decodeTokenAndStore({ commit }, token) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const decoded = jwt.decode(token) as MSJWTToken;

    const user: User = {
      id: decoded.oid,
      firstName: decoded.family_name,
      lastName: decoded.given_name,
      email: decoded.upn,
    };

    // commit('currentUser/setUser', user, { root: true });
    commit('setUser', user);
  },
};

export default actions;
