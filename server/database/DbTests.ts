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
          members: [{ mId: 'microsoftIdentifier', alias: 'Koza', avatarURL: '' }],
        });
      }
    })
    .catch((err) => {
      console.log('Error with saving to database', err);
    });

  await TeamRepository.insert({
    name: 'Kozleta',
    members: [{ mId: 'microsoftIdentifier', alias: 'Koza', avatarURL: '' }],
  });

  TeamRepository.insertMany([{
    name: 'aligatory',
    members: [{ mId: 'alek', alias: 'zawodnik', avatarURL: '' }, { mId: 'franek', alias: 'szybki', avatarURL: '' }],
  }, {
    name: 'jagnię',
    members: [{ mId: 'nabuchodonozor', alias: 'zawodnik', avatarURL: '' }, { mId: 'russelWe3trbrook', alias: 'szybki', avatarURL: '' }],
  }]).catch((err) => {
    console.log(err);
  });
}
