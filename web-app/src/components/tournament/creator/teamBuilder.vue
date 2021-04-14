<template>
  <q-form @submit.prevent="submitAddTeam">
    <q-card :style="$q.screen.lt.sm ? '' : 'height:75vh'">
      <q-card-section class="q-ma-none q-pb-none">
        <div class="text-h6">{{ $t('tournament.team.builderTitle') }}</div>

        <q-input
          clearable
          clear-icon="close"
          outlined
          v-model="teamName"
          :label="$t('tournament.team.name')"
          :error-message="teamNameErrorMessage"
          :error="isErrorInputTeamName"
        />
      </q-card-section>
      <q-card-section class="q-ma-none q-py-none">
        <q-virtual-scroll :items="players" separator style="max-height: 40vh">
          <template v-slot="{ item }">
            <q-item dense>
              <q-item-section>
                <q-item-label class="row">
                  <q-item class="q-pa-none col-11">
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="item.avatarSrc" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      {{ item.firstName }} {{ item.lastName }}
                    </q-item-section>
                  </q-item>

                  <q-btn
                    class="col-1"
                    dense
                    flat
                    text-color="red"
                    icon="close"
                    @click="deletePlayer(item)"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-virtual-scroll>
      </q-card-section>
      <q-card-section class="row items-stretch content-center q-pb-none">
        <q-select
          :class="$q.screen.gt.xs ? 'col-11 q-pb-none' : 'col-12'"
          clearable
          filled
          use-input
          v-model="player"
          input-debounce="100"
          :options="filterOptions"
          :label="$t('tournament.team.choosePlayer')"
          @filter="selectFilter"
          @input="addPlayerControl"
          emit-value
          behavior="menu"
          :error-message="playerSelectErrorMessage"
          :error="isErrorSelectPlayer"
        >
          <template v-slot:selected-item>
            <q-item v-if="player" class="q-pa-none">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="player.avatarSrc" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ player.firstName }} {{ player.lastName }}
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{ $t('common.noSearchResults') }}
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
          v-if="$q.screen.gt.xs"
          class="col-1"
          text-color="white"
          color="green"
          icon="add"
          dense
          @click="addPlayer"
        />
      </q-card-section>
      <q-card-section
        class="q-pt-none"
        :style="$q.screen.gt.xs ? 'position:absolute; bottom:0' : ''"
      >
        <q-btn
          :disabled="players.length < 1"
          :label="$t('tournament.team.add')"
          type="submit"
          color="primary"
          class="q-mt-md"
          :style="$q.screen.gt.xs ? '' : 'width:100%'"
        >
          <q-tooltip v-if="players.length < 1" content-class="bg-accent">
            {{ $t('tournament.atLeastOneMemberError') }}
          </q-tooltip>
        </q-btn>
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

  private teamNameErrorMessage = this.$t('tournament.tooShortTeamNameError');
  private playerSelectErrorMessage = this.$t('tournament.cannotBeBlankError');
  private isErrorSelectPlayer = false;
  private isErrorInputTeamName = false;
  private teamName = '';
  private player: User | null = null;
  private filterOptions: User[] = [];
  private players: User[] = [];

  private addPlayerControl() {
    if (this.$q.screen.lt.md) this.addPlayer();
  }

  private addPlayer() {
    if (!this.validateTeamMember()) return;
    if (this.player) this.players.push(this.player);
    this.player = null;
    this.isErrorSelectPlayer = false;
  }

  private deletePlayer(user: User) {
    this.players.splice(this.players.indexOf(user), 1);
  }

  private submitAddTeam() {
    if (!this.validationName()) return;

    const teamToAdd: Team = {
      name: this.teamName,
      members: this.players,
    };

    this.$emit('team-added', teamToAdd);

    this.teamName = '';
    this.player = null;
    this.players = [];
    this.isErrorInputTeamName = false;
    this.isErrorSelectPlayer = false;
  }

  private validateTeamMember() {
    if (this.player) {
      if (this.players.indexOf(this.player) !== -1) {
        this.isErrorSelectPlayer = true;
        this.playerSelectErrorMessage = this.$t(
          'tournament.alreadyIncludedPlayerError'
        );
      } else this.isErrorSelectPlayer = false;
    } else {
      this.isErrorSelectPlayer = true;
      this.playerSelectErrorMessage = this.$t('tournament.cannotBeBlankError');
    }

    if (this.isErrorSelectPlayer) {
      return false;
    } else return true;
  }

  private validationName() {
    if (this.teamName.length <= 3) {
      this.isErrorInputTeamName = true;
      this.teamNameErrorMessage = this.$t('tournament.tooShortTeamNameError');
    } else if (this.teamName.length > 40) {
      this.isErrorInputTeamName = true;
      this.teamNameErrorMessage = this.$t('tournament.tooLongTeamNameError');
    } else {
      this.isErrorInputTeamName = false;
    }

    if (this.isErrorInputTeamName) {
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
