export interface UserStateInterface {
  _id: string;
  tenantId: string;
  name: string;
  username: string;
}

function state(): UserStateInterface {
  return {
    _id: '',
    tenantId: '',
    name: '',
    username: '',
  };
}

export default state;
