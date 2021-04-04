<template>
  <q-form @submit.prevent="submitAddTeam">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t('tournament.team.builderTitle') }}</div>

        <q-input
          clearable
          clear-icon="close"
          outlined
          v-model="teamName"
          ref="teamNameRef"
          :label="$t('tournament.team.name')"
          :error-message="$t('tournament.cannotBeBlankError')"
          :error="isErrorInputTeamName"
        />

        <q-select
          clearable
          filled
          use-input
          v-model="player1"
          input-debounce="100"
          ref="teamMember1"
          :options="filterOptions"
          :label="$t('tournament.team.captain')"
          @filter="selectFilter"
          emit-value
          behavior="menu"
          :error-message="$t('tournament.cannotBeBlankError')"
          :error="isErrorSelectPlayer1"
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
                {{ $t('common.noResults') }}
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
          :label="$t('tournament.team.secondMemberCreator')"
          @filter="selectFilter"
          emit-value
          behavior="menu"
          :error-message="$t('tournament.chooseAnotherPlayerError')"
          :error="isErrorSelectPlayer2"
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
                {{ $t('common.noResults') }}
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
          :label="$t('tournament.team.add')"
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
import { Team } from '../../../../../shared/types/Tournament';
import User from '../../../../../shared/types/User';

@Component
export default class TeamBuilder extends Vue {
  @Prop({ type: Array, required: true }) readonly users!: User[];

  private isErrorSelectPlayer1 = false;
  private isErrorSelectPlayer2 = false;
  private isErrorInputTeamName = false;
  private teamName = '';
  private player1: User | null = null;
  private player2: User | null = null;
  private filterOptions: User[] = [];

  private submitAddTeam() {
    if (!this.validation()) return;

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
    this.isErrorInputTeamName = false;
    this.isErrorSelectPlayer1 = false;
    this.isErrorSelectPlayer2 = false;
  }

  private validation() {
    if (this.teamName === '') {
      this.isErrorInputTeamName = true;
    } else {
      this.isErrorInputTeamName = false;
    }
    if (!this.player1) {
      this.isErrorSelectPlayer1 = true;
    } else {
      this.isErrorSelectPlayer1 = false;
    }
    if (this.player2 === this.player1 && this.player2) {
      this.isErrorSelectPlayer2 = true;
    } else {
      this.isErrorSelectPlayer2 = false;
    }

    if (
      this.isErrorInputTeamName ||
      this.isErrorSelectPlayer1 ||
      this.isErrorSelectPlayer2
    ) {
      return false;
    } else return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private selectFilter(val: string, update: any) {
    if (val) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      update(() => {
        const needle = val.toLowerCase();
        this.filterOptions = this.users.filter(
          user =>
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
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
