import User from 'app/../shared/types/User';

function state(): User {
  return {
    id: '',
    alias: '',
    firstName: '',
    lastName: '',
    email: '',
    avatarSrc: '',
  };
}

export default state;
