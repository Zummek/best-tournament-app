import User from 'app/../shared/types/User';

export interface TournamentListData {
  id: string;
  name: string;
  status: string;
  participants: User[];
}
