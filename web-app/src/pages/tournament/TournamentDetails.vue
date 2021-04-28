<template>
  <q-page class="flex flex-center">
    <q-spinner v-if="isLoading || !tournament" color="primary" size="3em" />
    <q-card
      v-else
      class="q-px-xs-none q-px-sm-md"
      :class="{ fit: $q.screen.xs }"
    >
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
                  <!-- <img :src="tournament.owner.avatarSrc" /> -->
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
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
            :label="$t('tournament.match.played')"
          />
        </div>
      </q-card-section>
      <q-card-section
        class="q-px-xs-md"
        v-if="tournament.type === 'round-robin'"
      >
        <match-component
          :match="match"
          v-for="match in tournament.matches"
          :key="match.id"
          :isOwner="isOwner"
          :tournamentId="tournament.id"
          :small="$q.screen.xs"
          @refreshData="getTournamentDetails"
        />
      </q-card-section>
      <q-card-section class="q-px-none" v-else>
        <div
          style="display: flex; overflow-x: auto; flex-wrap: nowrap; max-width: 1500px"
        >
          <tournament-bracket
            style="flex: 0 0 auto; padding: 5px "
            :matches="tournament.matches"
            :nextMatchId="tournament.matches[0].id"
            :isOwner="isOwner"
            :tournamentId="tournament.id"
            :remainingRounds="roundAmount"
            @refreshData="getTournamentDetails"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Tournament from '../../../../shared/types/Tournament';
import MatchComponent from '../../components/tournament/details/MatchComponent.vue';
import TournamentBracket from '../../components/tournament/details/TournamentBracket.vue';
// import moment from 'moment';
import API from 'src/services/API';
import store from 'src/store';

@Component({
  components: {
    MatchComponent,
    TournamentBracket,
  },
})
export default class TournamentDetails extends Vue {
  private tournament: Tournament | null = null;

  private isOwner = false;
  private isLoading = true;

  private async created() {
    await this.getTournamentDetails();

    this.isOwner = store.state.currentUser.id === this.tournament?.owner.id;
  }

  get completedMatchesFormated() {
    if (this.tournament) {
      const allMatches = this.tournament.matches.length;
      let completedMatches = 0;

      for (let i = 0; i < this.tournament.matches.length; i++) {
        if (this.tournament.matches[i].isFinished) {
          completedMatches++;
        }
      }

      return `${completedMatches} / ${allMatches}`;
    }
  }

  get roundAmount() {
    let roundAmount = 0;
    do {
      roundAmount++;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } while (2 ** roundAmount < this.tournament!.teams.length);

    return roundAmount;
  }

  get participantsAmount() {
    if (this.tournament) {
      let participantsAmount = 0;

      for (let i = 0; i < this.tournament.teams.length; i++) {
        participantsAmount += this.tournament.teams[i].members.length;
      }

      return participantsAmount;
    }
  }

  private async getTournamentDetails() {
    this.isLoading = true;
    try {
      this.tournament = await API.tournament.getTournament(
        this.$route.params.id
      );
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.response.status === 404) void this.$router.push('/*');
      return;
    }
    this.sortMatches();
    this.isLoading = false;
  }

  private sortMatches() {
    if (this.tournament) {
      // sort array by isFinished and Date
      this.tournament.matches.sort((a, b) => {
        if (a.isFinished && b.isFinished) {
          return 0;
          // if (moment(a.date).diff(b.date) > 0) return -1;
          // else return 1;
        } else if (!a.isFinished && b.isFinished) return 1;
        else if (a.isFinished && !b.isFinished) return -1;
        else if (!a.isFinished && !b.isFinished) {
          return 0;
          // if (moment(a.date).diff(b.date) > 0) return -1;
          // else return 1;
        }

        return 0;
      });

      // add next three matches or witout score to the top
      /*let maxMatchesOnTop = 3;
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
      }*/
    }
  }
}
</script>
