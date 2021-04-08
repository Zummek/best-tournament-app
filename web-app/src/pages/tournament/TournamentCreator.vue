<template>
  <q-page class="row justify-center ">
    <div class="col-12 q-pa-lg " style="max-width:1500px">
      <div class="row justify-between">
        <div
          :class="$q.screen.gt.xs ? 'col-6' : 'col-12'"
          :style="$q.screen.gt.xs ? 'max-width: 300px' : ''"
        >
          <div
            class="cursor-pointer"
            :style="$q.screen.gt.xs ? '' : 'text-align:center'"
          >
            <h5 class="q-my-md">
              {{ tournamentName }}
              <q-badge
                v-if="tournamentName === initTournamentName"
                rounded
                outline
                color="grey"
                align="bottom"
                transparent
              >
                <q-icon name="edit" />
              </q-badge>
            </h5>

            <q-popup-edit
              v-model="tournamentName"
              :validate="val => val.length > 3 && val.length < 40"
            >
              <template
                v-slot="{
                  initialValue,
                  value,
                  emitValue,
                  validate,
                  set,
                  cancel,
                }"
              >
                <q-input
                  autofocus
                  dense
                  :value="tournamentName"
                  :hint="$t('tournament.name')"
                  :rules="[
                    val =>
                      validate(value) || $t('tournament.wrongInputLengthError'),
                  ]"
                  @input="emitValue"
                >
                  <template v-slot:after>
                    <q-btn
                      flat
                      dense
                      color="negative"
                      icon="cancel"
                      @click.stop="cancel"
                    />
                    <q-btn
                      flat
                      dense
                      color="positive"
                      icon="check_circle"
                      @click.stop="set"
                      :disable="
                        validate(value) === false || initialValue === value
                      "
                    />
                  </template>
                </q-input>
              </template>
            </q-popup-edit>
          </div>
        </div>
        <div class="col-6 gt-xs" style="text-align:right">
          <q-btn
            @click="submitAddTournament"
            :disabled="teams.length < 2"
            padding="sm"
            color="primary"
          >
            <q-tooltip v-if="teams.length < 2" content-class="bg-accent">
              {{ $t('tournament.atLeastTwoTeamsError') }}
            </q-tooltip>
            <q-icon class="q-mx-none" name="add" />
            {{ $t('common.create') }}
          </q-btn>
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
        v-if="$q.screen.lt.sm"
        position="bottom-right"
        :offset="[36, 18]"
      >
        <q-btn
          @click="submitAddTournament"
          :disabled="teams.length < 2"
          padding="sm"
          color="primary"
        >
          <q-tooltip v-if="teams.length < 2" content-class="bg-accent">
            {{ $t('tournament.atLeastTwoTeamsError') }}
          </q-tooltip>
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
  private initTournamentName = '[Tournament name]';
  private tournamentName = this.initTournamentName;
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
    {
      name: 'action',
      align: 'right',
      label: '',
      field: 'action',
    },
  ];

  private teams: Team[] = [];
  private users: User[] = [];

  private async submitAddTournament() {
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
  
  private async createTournament() {
    console.log(this.teams);
    const response = await API.tournament.createTournament({
      name: this.tournamentName,
      teams: this.teams,
    });
    console.log(response);
  }

  private async created() {
    await this.getUsers();
  }
  private async getUsers() {
    this.users = await API.organization.getUsers();

    this.users.forEach(function(user) {
      user.avatarSrc = 'https://cdn.quasar.dev/img/boy-avatar.png';
    });
    console.log(this.users);
  }
  // avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
}
</script>
<style></style>
