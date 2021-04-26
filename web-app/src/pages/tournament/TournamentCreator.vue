<template>
  <q-page class="row justify-center">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
      class="col-12"
      style="max-width:1500px"
    >
      <q-step
        :name="1"
        title="Select tournament type"
        icon="settings"
        :done="step > 1"
      >
        <div class="row col-12 justify-center">
          <selectable-tournament-type 
            :tournamentTypeName="$t('tournament.type.roundRobin')"
            iconName="warning"
            @updateTournamentType="updateTournamentType"
          />
          <selectable-tournament-type 
            :tournamentTypeName="$t('tournament.type.singleElimination')"
            iconName="settings"
            @updateTournamentType="updateTournamentType"
          />

          <!-- <div class="col-8">
            <strong> {{ $t('tournament.type.label') }}: </strong>
            <q-option-group
              :options="tournamentTypesOptions"
              type="radio"
              v-model="tournamentType"
              inline
              dense
            />
          </div> -->
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="2"
        title="Build your teams"
        icon="settings"
        :done="step > 2"
      >
        <div class="col-12 q-pa-lg ">
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
                          validate(value) ||
                          $t('common.error.wrongInputLength'),
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
                  {{ $t('tournament.error.atLeastTwoTeams') }}
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
                {{ $t('tournament.error.atLeastTwoTeams') }}
              </q-tooltip>
              <q-icon class="q-mx-none" name="add" />
              {{ $t('common.create') }}
            </q-btn>
          </q-page-sticky>
        </div>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script lang="ts">
import User from '../../../../shared/types/User';
import { Vue, Component } from 'vue-property-decorator';
import TeamsList from '../../components/tournament/creator/teamsList.vue';
import TeamBuilder from '../../components/tournament/creator/teamBuilder.vue';
import SelectableTournamentType from '../../components/tournament/creator/selectableTournamentType.vue';
import { Team } from '../../../../shared/types/Tournament';
import API from 'src/services/API';

@Component({
  components: { TeamsList, TeamBuilder, SelectableTournamentType },
})
export default class TournamentCreator extends Vue {
  private step = 1;
  private tournamentType = '';
  private initTournamentName = '[Tournament name]';
  private tournamentName = this.initTournamentName;
  private isErrorTournamentName = false;
  private pagination = {
    rowsPerPage: 0,
  };

  private updateTournamentType(tournType: string){
    this.tournamentType = tournType;
    console.log(this.tournamentType);
  }

  private tournamentTypesOptions = [
    {
      label: this.$t('tournament.type.roundRobin') as string,
      value: 'round-robin',
    },
    {
      label: this.$t('tournament.type.singleElimination') as string,
      value: 'single-elimination',
    },
  ];

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

  private async created() {
    await this.getUsers();
  }

  private async submitAddTournament() {
    if (this.validation()) {
      try {
        const responseData = await API.tournament.createTournament({
          name: this.tournamentName,
          teams: this.teams,
        });

        void this.$router.push({
          name: 'TournamentDetails',
          params: { id: responseData.id },
        });
      } catch (error) {
        this.$q.notify({
          message: this.$t('tournament.error.addingTournament').toString(),
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

  private async getUsers() {
    this.users = await API.organization.getUsers();

    this.users.forEach(function(user) {
      user.avatarSrc = 'https://cdn.quasar.dev/img/boy-avatar.png';
    });
  }
}
</script>
<style></style>
