<template>
  <q-form @submit.prevent="submitAddTeam">
    <q-card :style="$q.screen.lt.sm ? '' : 'height:65vh'">
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
          counter
          maxlength="40"
        />
      </q-card-section>
      <q-card-section
        class="q-ma-none q-py-none"
        style="max-height: 45%; overflow: auto"
      >
        <q-virtual-scroll :items="players" separator>
          <template v-slot="{ item }">
            <q-item dense>
              <q-item-section>
                <div class="row">
                  <q-item class="q-pa-none col-11 textWrapDotted">
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
                </div>
              </q-item-section>
            </q-item>
          </template>
        </q-virtual-scroll>
      </q-card-section>
      <q-card-section class="row  content-center">
        <q-select
          class="col-12 q-pb-none"
          clearable
          filled
          use-input
          v-model="tempPlayer"
          input-debounce="100"
          :options="filterOptions"
          :label="$t('tournament.team.choosePlayer')"
          @filter="selectFilter"
          @input="addPlayer"
          @clear="
            () => {
              isErrorSelectPlayer = false;
            }
          "
          emit-value
          behavior="menu"
          :error-message="playerSelectErrorMessage"
          :error="isErrorSelectPlayer"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{ $t('common.noSearchResults') }}
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
              class="playerSelectScope"
            >
              <q-item-section avatar>
                <q-avatar size="2em">
                  <img :src="scope.opt.avatarSrc" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ scope.opt.firstName }} {{ scope.opt.lastName }}
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-section
        class="q-pt-none"
        :style="$q.screen.gt.xs ? 'position:absolute; bottom:0' : ''"
      >
        <q-btn
          :disabled="!players.length"
          :label="$t('tournament.team.add')"
          type="submit"
          color="primary"
          class="q-mt-md"
          :style="$q.screen.gt.xs ? '' : 'width:100%'"
        >
          <q-tooltip v-if="!players.length" content-class="bg-accent">
            {{ $t('tournament.team.error.atLeastOneMember') }}
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

  private teamNameErrorMessage = this.$t('tournament.team.error.tooShortTeam');
  private playerSelectErrorMessage = this.$t('common.error.cannotBeBlank');
  private isErrorSelectPlayer = false;
  private isErrorInputTeamName = false;
  private teamName = '';
  private tempPlayer: User | null = null;
  private filterOptions: User[] = [];
  private players: User[] = [];

  private addPlayer() {
    if (!this.validateTeamMember()) return;
    if (this.tempPlayer) this.players.push(this.tempPlayer);
    this.tempPlayer = null;
    this.isErrorSelectPlayer = false;
  }

  private deletePlayer(user: User) {
    this.players.splice(this.players.indexOf(user), 1);
  }

  private submitAddTeam() {
    this.isErrorSelectPlayer = false;
    if (!this.validationName()) return;

    const teamToAdd: Team = {
      name: this.teamName,
      members: this.players,
    };

    this.$emit('team-added', teamToAdd);

    this.teamName = '';
    this.tempPlayer = null;
    this.players = [];
    this.isErrorInputTeamName = false;
    this.isErrorSelectPlayer = false;
  }

  private validateTeamMember() {
    if (this.tempPlayer) {
      if (this.players.indexOf(this.tempPlayer) !== -1) {
        this.isErrorSelectPlayer = true;
        this.playerSelectErrorMessage = this.$t(
          'tournament.team.error.alreadyIncludedPlayer'
        );
        this.tempPlayer = null;
      } else this.isErrorSelectPlayer = false;
    }

    if (this.isErrorSelectPlayer) {
      return false;
    } else return true;
  }

  private validationName() {
    if (this.teamName.length <= 3) {
      this.isErrorInputTeamName = true;
      this.teamNameErrorMessage = this.$t('tournament.team.error.tooShortName');
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
<style scoped>
.playerSelectScope {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
