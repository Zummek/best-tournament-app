<template>
  <q-page class="row justify-center">
    <q-stepper
      v-model="step"
      :vertical="$q.screen.lt.sm"
      color="primary"
      animated
      flat
      header-nav
      class="col-12"
      style="max-width:1500px"
    >
      <q-step
        :name="1"
        :title="$t('tournament.stepper.tournamentType')"
        :done="activeTournamentType != null"
        :error="step > 1 && activeTournamentType === null"
      >
        <tournament-type-selector :activeType="activeTournamentType" />
      </q-step>
      <q-step
        :name="2"
        :title="$t('tournament.stepper.buildTeams')"
        icon="people"
        :error="step > 2 && teams.length < 2"
        :done="step > 2 && teams.length >= 2"
      >
        <div class="col-12 " :class="$q.screen.gt.xs ? 'q-px-lg' : 'q-px-none'">
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
          <q-page-sticky position="bottom-right" :offset="[36, 18]">
            <q-btn @click="step = 3" padding="sm" color="primary">
              {{ $t('common.next') }}
              <q-icon
                class="q-ma-none"
                :name="$q.screen.gt.xs ? 'navigate_next' : 'expand_more'"
              />
            </q-btn>
          </q-page-sticky>
        </div>
      </q-step>
      <q-step
        :name="3"
        :title="$t('tournament.stepper.settings')"
        icon="settings"
      >
        <div class="row justify-between">
          <div class="gt-xs col-6" style="max-width: 600px; max-width: 75vh">
            <teams-list
              :data="teams"
              :columns="columns"
              :pagination="pagination"
              :tournType="activeTournamentType"
            />
          </div>
          <div class="row col-sm-6 col-12 q-px-md">
            <div
              class="col-sm-8 col-12"
              :class="$q.screen.gt.xs ? 'justify-start' : ''"
            >
              <tournament-name-changer
                @name-changed="updateTournamentName"
                :tournamentName="tournamentName"
              />
            </div>
            <div class="col-4 gt-xs" style="text-align:right">
              <q-btn
                @click="submitAddTournament"
                :disabled="teams.length < 2 || activeTournamentType === null"
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
            <div class="row col-12">
              <start-date-selector
                @update-date="updateStartDate"
                :date="startDate"
              />
            </div>
            <div class="row col-12 justify-center">
              <days-of-play @update-days="updateDays" :days="days" />
            </div>
            <div class="row col-12 justify-center">
              <frequency-selector
                @update-freq="updateFrequency"
                :frequency="frequency"
              />
            </div>
          </div>
        </div>

        <q-page-sticky
          v-if="$q.screen.lt.sm"
          position="bottom-right"
          :offset="[36, 18]"
        >
          <q-btn
            @click="submitAddTournament"
            :disabled="teams.length < 2 || activeTournamentType === null"
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
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script lang="ts">
import User from '../../../../shared/types/User';
import { Vue, Component } from 'vue-property-decorator';
import TeamsList from '../../components/tournament/creator/TeamsList.vue';
import TeamBuilder from '../../components/tournament/creator/TeamBuilder.vue';
import TournamentTypeSelector from '../../components/tournament/creator/TournamentTypeSelector.vue';
import TournamentNameChanger from '../../components/tournament/creator/TournamentNameChanger.vue';
import DaysOfPlay from '../../components/tournament/creator/DaysOfPlaySelector.vue';
import StartDateSelector from '../../components/tournament/creator/StartDateSelector.vue';
import FrequencySelector from '../../components/tournament/creator/FrequencySelector.vue';
import { Team, TournamentType } from '../../../../shared/types/Tournament';
import EventBus from '../../services/EventBus';
import API from 'src/services/API';

@Component({
  components: {
    TeamsList,
    TeamBuilder,
    TournamentTypeSelector,
    TournamentNameChanger,
    DaysOfPlay,
    FrequencySelector,
    StartDateSelector,
  },
})
export default class TournamentCreator extends Vue {
  private step = 1;
  private activeTournamentType: TournamentType | null = null;
  private tournamentName = this.$t('tournament.initName') as string;
  private startDate = '2019/02/01';
  private frequency = 1;
  private isErrorTournamentName = false;
  private pagination = {
    rowsPerPage: 0,
  };
  private days: Array<string> = [];

  private columns = [
    {
      name: 'name',
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
      label: '',
      align: 'right',
      field: 'action',
      sortable: false,
    },
  ];

  private teams: Team[] = [];
  private users: User[] = [];

  private async created() {
    await this.getUsers();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    EventBus.$on('updateActiveTournamentType', this.updateActiveTournamentType);
  }

  private beforeDestroy() {
    EventBus.$off('updateActiveTournamentType');
  }

  private updateActiveTournamentType(newTournamentType: TournamentType) {
    this.activeTournamentType = newTournamentType;
    this.step = 2;
  }

  private async submitAddTournament() {
    if (this.validation()) {
      try {
        const responseData = await API.tournament.createTournament({
          name: this.tournamentName,
          teams: this.teams,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          type: this.activeTournamentType!,
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

  private updateTournamentName(name: string) {
    this.tournamentName = name;
  }

  private updateFrequency(newFreq: number) {
    this.frequency = newFreq;
  }

  private updateDays(newDays: Array<string>) {
    this.days = newDays;
  }

  private updateStartDate(newDate: string) {
    this.startDate = newDate;
  }

  private validation() {
    if (
      this.activeTournamentType != 'single-elimination' &&
      this.activeTournamentType != 'round-robin'
    )
      return false;

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
<style>
.q-stepper--vertical .q-stepper__step-inner {
  padding: 0 24px 8px 24px;
}

.textWrapDotted {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
