<template>
  <q-page class="flex flex-center">
    <q-card class="q-px-xs-none q-px-sm-md">
      <q-card-section>
        <div class="row">
          <q-input
            style="width:50%"
            borderless
            readonly
            v-model="tournament.name"
            autogrow
            :label="$t('tournament.name')"
          />
          <q-field
            borderless
            :label="$t('tournament.organizer')"
            stack-label
            style="width:50%"
          >
            <template v-slot:control>
              <q-chip>
                <q-avatar>
                  <img :src="tournament.owner.avatarSrc" />
                </q-avatar>
                {{ tournament.owner.firstName }}
                {{ tournament.owner.lastName }}
              </q-chip>
            </template>
          </q-field>
        </div>
        <div class="row">
          <q-input
            borderless
            style="width:50%"
            readonly
            v-model="participantsAmount"
            :label="$t('tournament.participantsAmount')"
          />
          <q-input
            style="width:50%"
            borderless
            readonly
            v-model="completedMatchesFormated"
            :label="$t('tournament.matchesPlayed')"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-px-xs-sm">
        <outcome-table-item
          :match="match"
          v-for="match in tournament.matches"
          :key="match.id"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Tournament from '../../../../shared/types/Tournament';
import OutcomeTableItem from '../../components/tournament/OutcomeTableItem.vue';
import moment from 'moment';

@Component({
  components: {
    OutcomeTableItem,
  },
})
export default class TournamentDetails extends Vue {
  private tournament!: Tournament;

  private created() {
    this.getTournamentDetails();
  }

  get completedMatchesFormated() {
    const allMatches = this.tournament.matches.length;
    let completedMatches = 0;

    for (let i = 0; i < this.tournament.matches.length; i++) {
      if (this.tournament.matches[i].isFinished) {
        completedMatches++;
      }
    }

    return `${completedMatches} / ${allMatches}`;
  }

  get participantsAmount() {
    let participantsAmount = 0;

    for (let i = 0; i < this.tournament.teams.length; i++) {
      participantsAmount += this.tournament.teams[i].members.length;
    }

    return participantsAmount;
  }

  private getTournamentDetails() {
    //  call api here - this.$route.params.id

    this.tournament = {
      name: 'Najlepszy tourniej w życiu',
      owner: {
        id: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
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
              id: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
              alias: null,
              firstName: 'Alex',
              lastName: 'Strasza',
              email: 'example@example.net',
              avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
            },
            {
              id: 'fc95325c-8b2a-11eb-8dcd-0242ac130004',
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
              id: 'fc95325c-8b2a-11eb-8dcd-0242ac130005',
              alias: null,
              firstName: 'Alex',
              lastName: 'Strasza',
              email: 'example@example.net',
              avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
            },
            {
              id: 'fc95325c-8b2a-11eb-8dcd-0242ac130006',
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
              id: 'fc95325c-8b2a-11eb-8dcd-0242ac130007',
              alias: null,
              firstName: 'Alex',
              lastName: 'Strasza',
              email: 'example@example.net',
              avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
            },
            {
              id: 'fc95325c-8b2a-11eb-8dcd-0242ac130008',
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
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
                  alias: null,
                  firstName: 'Alex',
                  lastName: 'Strasza',
                  email: 'example@example.net',
                  avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
                },
                {
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130004',
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
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
                  alias: null,
                  firstName: 'Alex',
                  lastName: 'Strasza',
                  email: 'example@example.net',
                  avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
                },
                {
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130004',
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
          date: moment()
            .subtract(1, 'days')
            .toDate(),
        },
        {
          sideA: {
            team: {
              name: 'Born to be wild',
              members: [
                {
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
                  alias: null,
                  firstName: 'Alex',
                  lastName: 'Strasza',
                  email: 'example@example.net',
                  avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
                },
                {
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130004',
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
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130007',
                  alias: null,
                  firstName: 'Alex',
                  lastName: 'Strasza',
                  email: 'example@example.net',
                  avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
                },
                {
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130008',
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
          date: moment()
            .subtract(3, 'hours')
            .toDate(),
        },
        {
          sideA: {
            team: {
              name: 'Born to be die',
              members: [
                {
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130007',
                  alias: null,
                  firstName: 'Alex',
                  lastName: 'Strasza',
                  email: 'example@example.net',
                  avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
                },
                {
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130008',
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
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130003',
                  alias: null,
                  firstName: 'Alex',
                  lastName: 'Strasza',
                  email: 'example@example.net',
                  avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
                },
                {
                  id: 'fc95325c-8b2a-11eb-8dcd-0242ac130004',
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
          date: moment()
            .add(1, 'hour')
            .toDate(),
        },
      ],
    };

    this.sortMatches();
  }

  private sortMatches() {
    // sort array by isFinished and Date
    this.tournament.matches.sort((a, b) => {
      if (a.isFinished && b.isFinished) {
        if (moment(a.date).diff(b.date) > 0) return -1;
        else return 1;
      } else if (!a.isFinished && b.isFinished) return 1;
      else if (a.isFinished && !b.isFinished) return -1;
      else if (!a.isFinished && !b.isFinished) {
        if (moment(a.date).diff(b.date) > 0) return -1;
        else return 1;
      }

      return 0;
    });

    // add next three matches or witout score to the top
    let maxMatchesOnTop = 3;
    for (
      let i = 0;
      this.tournament.matches.length > i && maxMatchesOnTop;
      i++
    ) {
      const match = this.tournament.matches[i];

      if (!match.isFinished && moment().diff(match.date, 'days') === 0) {
        maxMatchesOnTop--;
        this.tournament.matches.splice(i, 1);
        this.tournament.matches.unshift(match);
      }
    }
  }
}
</script>

<style></style>
