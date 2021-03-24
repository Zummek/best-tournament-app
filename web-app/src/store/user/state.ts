export interface UserStateInterface {
  id: string;
  tenantId: string;
  name: string;
  username: string;
}

function state(): UserStateInterface {
  return {
    id: '',
    tenantId: '',
    name: '',
    username: '',
  };
}

export default state;
