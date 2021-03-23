<template>
  <q-page>
    <div class="q-px-lg">
      <div class="row col-12">
        <h5>Tournament Creator</h5>
      </div>
      <q-form @submit="submitAddTournament">
        <div class="row justify-between">
          <div class="col-6" style="max-width: 300px">
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
          <div class="col-6 q-pr-lg">
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
        </div>
        <div class="row justify-between">
          <div class="col-6" style="max-width: 600px">
            <teams-list
              :data="teams"
              :columns="columns"
              :pagination="pagination"
            />
          </div>
          <div class="col-6 q-px-md" style="max-width: 600px">
            <q-form @submit="submitAddTeam">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Team builder</div>

                  <q-input
                    clearable
                    clear-icon="close"
                    outlined
                    v-model="teamName"
                    ref="teamNameRef"
                    label="Team name"
                    :rules="[
                      val => (val && val.length > 0) || 'Name cannot be blank!',
                    ]"
                  />
                  <q-select
                    filled
                    v-model="player1"
                    ref="teamMember1"
                    :options="users"
                    option-value="val"
                    option-label="firstName"
                    label="Captain"
                    emit-value
                    map-options
                    :rules="[
                      val =>
                        (val.firstName && val.firstName.length > 0) ||
                        'Name cannot be blank!',
                    ]"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section avatar>
                          <q-avatar>
                            <img :src="scope.opt.avatarSrc" />
                          </q-avatar>
                        </q-item-section>
                        <q-item-section>
                          {{ scope.opt.firstName }} {{ scope.opt.lastName }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <q-select
                    clearable
                    v-if="player1"
                    filled
                    v-model="player2"
                    ref="teamMember2"
                    :options="users"
                    option-value="val"
                    option-label="firstName"
                    label="Team member"
                    emit-value
                    map-options
                    :rules="[
                      val =>
                        val !== player1 ||
                        val.length === 0 ||
                        'Choose another player',
                    ]"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section avatar>
                          <q-avatar>
                            <img :src="scope.opt.avatarSrc" />
                          </q-avatar>
                        </q-item-section>
                        <q-item-section>
                          {{ scope.opt.firstName }} {{ scope.opt.lastName }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <q-btn
                    label="Add team"
                    type="submit"
                    color="primary"
                    class="q-mt-md"
                  />
                </q-card-section>
              </q-card>
            </q-form>
          </div>
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
import { Vue, Component, Ref } from 'vue-property-decorator';
import teamsList from '../../components/teamsList.vue';
import { Team } from 'src/components/models';
import { QInput, QSelect } from 'quasar';

@Component({
  components: { teamsList },
})
export default class TournamentCreator extends Vue {
  @Ref() readonly teamNameRef!: QInput;
  @Ref() readonly teamMember1!: QSelect;
  @Ref() readonly teamMember2!: QSelect;
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

  private teamName = '';
  private player1: User | null = null;
  private player2: User | null = null;

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
  private submitAddTeam() {
    const teamToAdd: Team = {
      name: this.teamName,
      members: [],
    };
    if (this.player1) {
      teamToAdd.members.push(this.player1);
    }
    if (this.player2) {
      teamToAdd.members.push(this.player2);
    }

    this.teams.push(teamToAdd);

    // ERROR HERE (players going null)
    this.teamName = '';
    this.player1 = null;
    this.player2 = null;

    // this.teamNameRef.resetValidation();
    // this.teamMember1.resetValidation();
    // this.teamMember2.resetValidation();
  }
}

// methods: {
//     filterFn (val, update) = {
//       if (val === '') {
//         update(() => {
//           this.options = users.name;

//           // with Quasar v1.7.4+
//           // here you have access to "ref" which
//           // is the Vue reference of the QSelect
//         })
//         return
//       }

//       update(() => {
//         const needle = val.toLowerCase()
//         this.options = users.name.filter(v => v.toLowerCase().indexOf(needle) > -1)
//       })
//     }
//   }
</script>
<style></style>
