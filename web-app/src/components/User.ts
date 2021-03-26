export default interface User {
  id: string;
  alias: string | null;
  firstName: string;
  lastName: string;
  email: string;
  avatarSrc: string;
}
