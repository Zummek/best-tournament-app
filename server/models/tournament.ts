/* eslint-disable @typescript-eslint/no-unused-vars */
import ITournament from '../../shared/types/Tournament';
import Match from './match';
import Team from './team';

export default class Tournament implements ITournament {
  constructor(
    public name: string,
    public ownerMicrosoftId: string,
    public teams: Array<Team>,
    public matches: Array<Match>,
  ) {}
}
