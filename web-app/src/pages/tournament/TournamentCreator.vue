<template>
  <q-page class="row justify-center ">
    <div class="col-12 q-px-lg " style="max-width:1500px">
      <div class="row col-12">
        <h5>{{ $t('tournament.tournamentCreatorTitle') }}</h5>
      </div>
      <div class="row justify-between">
        <div
          :class="$q.screen.gt.xs ? 'col-6' : 'col-12'"
          :style="$q.screen.gt.xs ? 'max-width: 300px' : ''"
        >
          <q-input
            clearable
            clear-icon="close"
            outlined
            v-model="tournamentName"
            :label="$t('tournament.name')"
            :error-message="$t('tournament.cannotBeBlankError')"
            :error="isErrorTournamentName"
          />
        </div>
      </div>
      <div class="gt-xs row justify-between">
        <div class="col-6" style="max-width: 600px">
          <teams-list
            :data="teams"
            :columns="columns"
            :pagination="pagination"
          />
        </div>
        <div class="col-6 q-px-md " style="max-width: 600px">
          <team-builder @team-added="addTeam" :users="users" />
        </div>
      </div>
      <div class="lt-sm col-12 q-pt-md">
        <team-builder @team-added="addTeam" :users="users" />

        <teams-list
          class="q-pt-md q-pb-md"
          :data="teams"
          :columns="columns"
          :pagination="pagination"
        />
      </div>
      <q-page-sticky
        v-if="teams.length >= 2"
        position="bottom-right"
        :offset="[36, 18]"
      >
        <q-btn @click="submitAddTournament" padding="sm" color="primary">
          <q-icon class="q-mx-none" name="add" />
          {{ $t('common.create') }}
        </q-btn>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script lang="ts">
import User from '../../../../shared/types/User';
import { Vue, Component } from 'vue-property-decorator';
import TeamsList from '../../components/tournament/creator/TeamsList.vue';
import TeamBuilder from '../../components/tournament/creator/TeamBuilder.vue';
import { Team } from '../../../../shared/types/Tournament';
import API from 'src/services/API';

@Component({
  components: { TeamsList, TeamBuilder },
})
export default class TournamentCreator extends Vue {
  private tournamentName = '';
  private isErrorTournamentName = false;
  private pagination = {
    rowsPerPage: 0,
  };

  private columns = [
    {
      name: 'name',
      required: true,
      label: 'Team name',
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'participants',
      align: 'right',
      label: 'Participants',
      field: 'participants',
    },
  ];

  private teams: Team[] = [];
  private users: User[] = [];

  private async submitAddTournament() {
    // console.log('Creating tournament');
    if (this.validation()) {
      const responseData = await API.tournament.createTournament({
        name: this.tournamentName,
        teams: this.teams,
      });
      if (responseData?._id) {
        void this.$router.push({
          name: 'TournamentDetails',
          params: { id: responseData._id },
        });
      } else {
        this.$q.notify({
          message: this.$t('tournament.addingTournamentError').toString(),
          color: 'warning',
          textColor: 'black',
        });
      }
    }
  }
  private addTeam(team: Team) {
    this.teams.push(team);
  }

  private validation() {
    if (!this.tournamentName) {
      this.isErrorTournamentName = true;
      return false;
    } else {
      this.isErrorTournamentName = false;
      return true;
    }
  }

  private async created() {
    await this.getUsers();
  }
  private async getUsers() {
    this.users = await API.organization.getUsers();

    this.users.forEach(function(user) {
      user.avatarSrc = 'https://cdn.quasar.dev/img/boy-avatar.png';
    });
  }
  // avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
}
</script>
<style></style>
