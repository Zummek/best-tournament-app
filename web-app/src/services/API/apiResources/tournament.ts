import axiosInstance from '../axiosInstance';
import * as types from './types';

export const createTournament = async (
  payload: types.CreateTournamentPayload
) => {
  await axiosInstance.post('v1/tournament', payload);
};

export const getTournament = async (tournamentId: string) => {
  const response = await axiosInstance.get<types.getTournamentResponse>(
    `v1/tournament/${encodeURIComponent(tournamentId)}`
  );

  return response.data;

  // TODO: remove after tests
  /*return {
    name: 'Najlepszy tourniej w życiu',
    owner: {
      MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
      alias: null,
      firstName: 'Alex',
      lastName: 'Strasza',
      email: 'example@example.net',
      avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
    },
    teams: [
      {
        name: 'Born to fight',
        members: [
          {
            MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
            alias: null,
            firstName: 'Alex',
            lastName: 'Strasza',
            email: 'example@example.net',
            avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
          },
          {
            MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130004',
            alias: null,
            firstName: 'Alex',
            lastName: 'Strasza',
            email: 'example@example.net',
            avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
          },
        ],
      },
      {
        name: 'Born to be wild',
        members: [
          {
            MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130005',
            alias: null,
            firstName: 'Alex',
            lastName: 'Strasza',
            email: 'example@example.net',
            avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
          },
          {
            MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130006',
            alias: null,
            firstName: 'Alex',
            lastName: 'Strasza',
            email: 'example@example.net',
            avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
          },
        ],
      },
      {
        name: 'Born to be die',
        members: [
          {
            MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130007',
            alias: null,
            firstName: 'Alex',
            lastName: 'Strasza',
            email: 'example@example.net',
            avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
          },
          {
            MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130008',
            alias: null,
            firstName: 'Alex',
            lastName: 'Strasza',
            email: 'example@example.net',
            avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
          },
        ],
      },
    ],
    matches: [
      {
        sideA: {
          team: {
            name: 'Born to fight',
            members: [
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130004',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
            ],
          },
          score: {
            a: 3,
            b: 1,
          },
        },
        sideB: {
          team: {
            name: 'Born to be wild',
            members: [
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130004',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
            ],
          },
          score: {
            a: 3,
            b: 1,
          },
        },
        isFinished: true,
      },
      {
        sideA: {
          team: {
            name: 'Born to be wild',
            members: [
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130004',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
            ],
          },
          score: {
            a: 5,
            b: 3,
          },
        },
        sideB: {
          team: {
            name: 'Born to be die',
            members: [
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130007',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130008',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
            ],
          },
          score: {
            a: 5,
            b: 4,
          },
        },
        isFinished: true,
      },
      {
        sideA: {
          team: {
            name: 'Born to be die',
            members: [
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130007',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130008',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
            ],
          },
          score: {
            a: -1,
            b: -1,
          },
        },
        sideB: {
          team: {
            name: 'Born to fight',
            members: [
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
              {
                MSId: 'fc95325c-8b2a-11eb-8dcd-0242ac130004',
                alias: null,
                firstName: 'Alex',
                lastName: 'Strasza',
                email: 'example@example.net',
                avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
              },
            ],
          },
          score: {
            a: -1,
            b: -1,
          },
        },
        isFinished: false,
      },
    ],
  } as Tournament;*/
};
