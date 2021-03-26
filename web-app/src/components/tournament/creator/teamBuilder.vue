<template>
  <q-form @submit.prevent="submitAddTeam">
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
          error-message="Cannot be blank!"
          :error="isErrorTeamName"
        />

        <q-select
          clearable
          filled
          use-input
          v-model="player1"
          input-debounce="100"
          ref="teamMember1"
          :options="filterOptions"
          label="Captain"
          @filter="selectFilter"
          emit-value
          behavior="menu"
          error-message="Cannot be blank!"
          :error="isErrorPlayer1"
        >
          <template v-slot:selected-item>
            <q-item v-if="player1" class="q-pa-none">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="player1.avatarSrc" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ player1.firstName }} {{ player1.lastName }}
              </q-item-section>
            </q-item>
          </template>
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
          use-input
          v-model="player2"
          ref="teamMember2"
          :options="filterOptions"
          label="Second member (optional)"
          @filter="selectFilter"
          emit-value
          behavior="menu"
          error-message="Choose different player!"
          :error="isErrorPlayer2"
        >
          <template v-slot:selected-item>
            <q-item v-if="player2" class="q-pa-none">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="player2.avatarSrc" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ player2.firstName }} {{ player2.lastName }}
              </q-item-section>
            </q-item>
          </template>
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
          :style="$q.screen.gt.xs ? '' : 'width:100%'"
        />
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Team } from 'src/components/models';
import User from 'src/components/User';

@Component
export default class TeamBuilder extends Vue {
  @Prop({ type: Array, required: true }) readonly users!: User[];

  private isErrorPlayer1 = false;
  private isErrorPlayer2 = false;
  private isErrorTeamName = false;
  private teamName = '';
  private player1: User | null = null;
  private player2: User | null = null;

  private resetFilters() {
    this.isErrorPlayer1 = false;
    this.isErrorPlayer2 = false;
    this.isErrorTeamName = false;
  }

  private submitAddTeam() {
    // validation
    if (this.teamName === '') {
      this.isErrorTeamName = true;
    } else {
      this.isErrorTeamName = false;
    }
    if (!this.player1) {
      this.isErrorPlayer1 = true;
    } else {
      this.isErrorPlayer1 = false;
    }
    if (this.player2 === this.player1 && this.player2) {
      this.isErrorPlayer2 = true;
    } else {
      this.isErrorPlayer2 = false;
    }

    if (this.isErrorTeamName || this.isErrorPlayer1 || this.isErrorPlayer2) {
      return;
    }

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

    this.$emit('team-added', teamToAdd);

    this.teamName = '';
    this.player1 = null;
    this.player2 = null;
    this.isErrorTeamName = false;
    this.isErrorPlayer1 = false;
    this.isErrorPlayer2 = false;
  }

  private filterOptions: User[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private selectFilter(val: string, update: any) {
    if (val) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      update(() => {
        const needle = val.toLowerCase();
        this.filterOptions = this.users.filter(
          user =>
            (user.firstName + ' ' + user.lastName)
              .toLowerCase()
              .indexOf(needle) > -1
        );
      });

      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    update(() => {
      this.filterOptions = this.users;
    });
  }
}
</script>
