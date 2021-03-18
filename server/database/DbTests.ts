/* eslint-disable no-console */
import Tournament from '../../shared/types/Tournament';
import TeamRepository from './repositories/TeamRepository';
import TournamentRepository from './repositories/TournamentRepository';

export default async function dbTests() {
  TournamentRepository
    .insert({
      name: 'Memoriał  JP', ownerMId: 'identyfikator-wlasciciela', teams: [], matches: [],
    })
    .then((document) => {
      const t: Tournament = document;
      console.log(t.id);
      for (let i = 0; i < 8; i += 1) {
        TeamRepository.insert({
          name: `Kozy ${i}`,
          members: [{ mId: 'microsoftIdentifier', alias: 'Koza' }],
        });
      }
    })
    .catch((err) => {
      console.log('Error with saving to database', err);
    });

  await TeamRepository.insert({
    name: 'Kozleta',
    members: [{ mId: 'microsoftIdentifier', alias: 'Koza' }],
  });

  TeamRepository.insertMany([{
    name: 'aligatory',
    members: [{ mId: 'alek', alias: 'zawodnik' }, { mId: 'franek', alias: 'szybki' }],
  }, {
    name: 'jagnię',
    members: [{ mId: 'nabuchodonozor', alias: 'zawodnik' }, { mId: 'russelWe3trbrook', alias: 'szybki' }],
  }]).catch((err) => {
    console.log(err);
  });
}
