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
          :rules="[val => (val && val.length > 0) || 'Name cannot be blank!']"
        />
        <q-select
          filled
          v-model="player1"
          ref="teamMember1"
          :options="data"
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
          :options="data"
          option-value="val"
          option-label="firstName"
          label="Team member"
          emit-value
          map-options
          :rules="[
            val =>
              val !== player1 || val.length === 0 || 'Choose another player',
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
          :style="$q.screen.gt.xs ? '' : 'width:100%'"
        />
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IPagination, IColumns, Team } from 'src/components/models';
import User from 'src/components/User';
@Component
export default class teamBuilder extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly data!: User[];

  private teamName = '';
  private player1: User | null = null;
  private player2: User | null = null;
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

    this.$emit('team-added', teamToAdd);

    // ERROR HERE (players going null)
    this.teamName = '';
    this.player1 = null;
    this.player2 = null;

    // this.teamNameRef.resetValidation();
    // this.teamMember1.resetValidation();
    // this.teamMember2.resetValidation();
  }
}
</script>
