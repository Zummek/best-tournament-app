<template>
  <q-page>
    <div class="q-px-lg">
      <div class="row col-12">
        <h5>Tournament Creator</h5>
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
            label="Tournament name"
            error-message="Cannot be blank!"
            :error="isErrorTournamentName"
          />
        </div>
      </div>
      <div class="gt-xs row justify-between">
        <div class="col-6" style="max-width: 800px">
          <teams-list
            :data="teams"
            :columns="columns"
            :pagination="pagination"
          />
        </div>
        <div class="col-6 q-px-md" style="max-width: 600px">
          <!-- team builder -->
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
        v-if="teams.length"
        position="bottom-right"
        :offset="[36, 18]"
      >
        <q-btn padding="sm" color="primary" @click="submitAddTournament">
          <q-icon class="q-mx-none" name="add" />
          Create
        </q-btn>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script lang="ts">
import User from 'src/components/User';
import { Vue, Component } from 'vue-property-decorator';
import TeamsList from '../../components/tournament/creator/TeamsList.vue';
import TeamBuilder from '../../components/tournament/creator/TeamBuilder.vue';
import { Team } from 'src/components/models';
// import { QInput, QSelect } from 'quasar';

@Component({
  components: { TeamsList, TeamBuilder },
})
export default class TournamentCreator extends Vue {
  // @Ref() readonly teamNameRef!: QInput;
  // @Ref() readonly teamMember1!: QSelect;
  // @Ref() readonly teamMember2!: QSelect;
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

  private teams: Team[] = [
    {
      name: 'Team1 co rozwali wszystkie inne teamy i wgl zniszczy je wszystkie',
      members: [
        {
          id: '1',
          alias: 'some string',
          firstName: 'Jakub',
          lastName: 'Tabaluga',
          email: 'string',
          avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
        },
      ],
    },
    {
      name: 'Superduper TEAM',
      members: [
        {
          id: '1',
          alias: 'some string',
          firstName: 'Jakub',
          lastName: 'Tabaluga',
          email: 'string',
          avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
        },
        {
          id: '2',
          alias: 'some string',
          firstName: 'Grzegorz',
          lastName: 'Puchatek',
          email: 'string',
          avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
        },
      ],
    },
  ];

  private users: User[] = [
    {
      id: '1',
      alias: 'some string',
      firstName: 'Jakub',
      lastName: 'Tabaluga',
      email: 'string',
      avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
    },
    {
      id: '2',
      alias: 'some string',
      firstName: 'Gargamel',
      lastName: 'Tabaluga',
      email: 'string',
      avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
    },
    {
      id: '3',
      alias: 'some string',
      firstName: 'Jarek',
      lastName: 'Duda',
      email: 'string',
      avatarSrc: 'https://cdn.quasar.dev/img/boy-avatar.png',
    },
  ];
  private submitAddTournament() {
    if (!this.tournamentName) {
      this.isErrorTournamentName = true;
      return;
    } else {
      this.isErrorTournamentName = false;
    }

    console.log('Creating tournament');

    // SENDING THAT CRAP FAAAAR AWAY
  }

  private addTeam(team: Team) {
    this.teams.push(team);
  }
}
</script>
<style></style>
