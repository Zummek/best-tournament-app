/* eslint-disable no-console */
import Tournament, { Team } from '../../shared/types/Tournament';
import User from '../../shared/types/User';
import TeamRepository from './repositories/TeamRepository';
import TournamentRepository from './repositories/TournamentRepository';

export default async function dbTests() {
  const members1 : User[] = [];
  const members2 : User[] = [];
  for (let i = 0; i < 4; i += 1) {
    const user : User = {
      alias: `janek${i}`,
      MSId: 'id1',
      avatarSrc: 'av',
      firstName: '',
      lastName: '',
      email: '',
    };
    if (i % 2 === 0) { members1.push(user); } else { members2.push(user); }
  }
  const teamParzysci : Team = await TeamRepository.create('parzysci', members1);
  const teamNieparzysci: Team = await TeamRepository.create('NIEparzysci', members2);
  // console.log(teamParzysci);
  // console.log(teamNieparzysci);
  const teams : Team[] = [];
  teams.push(teamParzysci);
  teams.push(teamNieparzysci);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let t : Tournament = await TournamentRepository.create('turniej1', 'janek1 jest wlascicielem', teams);
  // console.log(t);
  t = await TournamentRepository.createMatch(t, t.teams[0], t.teams[1]);
  // console.log(t);
  t.matches[0].sideA.score.a = 1;
  t.matches[0].sideA.score.b = 2;
  t.matches[0].sideB.score.a = 3;
  t.matches[0].sideB.score.b = 4;
  t.matches[0].isFinished = true;
  TournamentRepository.updateMatch(t, t.matches[0]);

  if (t.id !== undefined) { t = await TournamentRepository.getById(t.id); }
  // console.log(t.teams[0]);
  console.log(t);
  // await TournamentRepository.insertMatch(t, teamParzysci, teamNieparzysci).catch();

  // teams.push({
  //   name: 'zlyTeamBrakId',
  //   members: [],
  // });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //
  // let t2: Tournament;
  // if (typeof t.id === 'string') {
  //   t2 = await TournamentRepository.getById(t.id);
  //   console.log(t2);
  // }
  // console.log(tournament);
  // TournamentRepository
  //   .insert({
  //     name: 'Memoriał  JP', ownerMId: 'identyfikator-wlasciciela', teams: [], matches: [],
  //   })
  //   .then((document) => {
  //     const t: Tournament = document;
  //     console.log(t.id);
  //     for (let i = 0; i < 8; i += 1) {
  //       TeamRepository.insert({
  //         name: `Kozy ${i}`,
  //         members: [{ mId: 'microsoftIdentifier', alias: 'Koza', avatarURL: '' }],
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('Error with saving to database', err);
  //   });

  // await TeamRepository.insert({
  //   name: 'Kozleta',
  //   members: [{ mId: 'microsoftIdentifier', alias: 'Koza', avatarURL: '' }],
  // });

  // TeamRepository.insertMany([{
  //   name: 'aligatory',
  // eslint-disable-next-line max-len
  //   members: [{ mId: 'alek', alias: 'zawodnik', avatarURL: '' }, { mId: 'franek', alias: 'szybki', avatarURL: '' }],
  // }, {
  //   name: 'jagnię',
  // eslint-disable-next-line max-len
  //   members: [{ mId: 'nabuchodonozor', alias: 'zawodnik', avatarURL: '' }, { mId: 'russelWe3trbrook', alias: 'szybki', avatarURL: '' }],
  // }]).catch((err) => {
  //   console.log(err);
  // });
}
