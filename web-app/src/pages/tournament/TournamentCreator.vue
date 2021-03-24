<template>
  <q-page>
    <div class="q-px-lg">
      <div class="row col-12">
        <h5>Tournament Creator</h5>
      </div>
      <q-form @submit="submitAddTournament">
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
              :rules="[
                val => (val && val.length > 0) || 'Name cannot be blank!',
              ]"
            />
          </div>
          <div class="gt-xs col-6 q-pr-lg">
            <div class="row justify-end">Type of tournament</div>
            <div class="row justify-end">
              <q-radio v-model="tournamentMode" val="type1" label="Type1" />
              <q-radio
                disable
                v-model="tournamentMode"
                val="type2"
                label="Type2"
              />
            </div>
          </div>
          <div class="lt-sm col-12 q-pr-lg">
            <div class="row justify-between items-center">
              Type of tournament
              <q-radio v-model="tournamentMode" val="type1" label="Type1" />
              <q-radio
                disable
                v-model="tournamentMode"
                val="type2"
                label="Type2"
              />
            </div>
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
          <div class="col-6 q-px-md" style="max-width: 600px">
            <!-- team builder -->
            <team-builder @team-added="addTeam" :data="users" />
          </div>
        </div>
        <div class="lt-sm col-12 q-pt-md">
          <team-builder @team-added="addTeam" :data="users" />

          <teams-list
            class="q-pt-md q-pb-md"
            :data="teams"
            :columns="columns"
            :pagination="pagination"
          />
        </div>
        <q-page-sticky position="bottom-right" :offset="[36, 18]">
          <q-btn color="primary" type="submit" icon="add">
            Create tournament
          </q-btn>
        </q-page-sticky>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import User from 'src/components/User';
import { Vue, Component } from 'vue-property-decorator';
import teamsList from '../../components/tournament/creator/TeamsList.vue';
import teamBuilder from '../../components/tournament/creator/TeamBuilder.vue';
import { Team } from 'src/components/models';
// import { QInput, QSelect } from 'quasar';

@Component({
  components: { teamsList, teamBuilder },
})
export default class TournamentCreator extends Vue {
  // @Ref() readonly teamNameRef!: QInput;
  // @Ref() readonly teamMember1!: QSelect;
  // @Ref() readonly teamMember2!: QSelect;
  private tournamentName = '';
  private tournamentMode = 'type1';
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
      members: [],
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
  ];
  private submitAddTournament() {
    console.log('Creating tournament');
    // SENDING THAT CRAP FAAAAR AWAY
  }

  private addTeam(team: Team) {
    this.teams.push(team);
  }
}
</script>
<style></style>
