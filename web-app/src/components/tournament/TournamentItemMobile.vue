<template>
  <div class="row q-pa-xs col-12">
    <q-btn
      :to="{ name: 'TournamentDetails', params: { id: tournament.id } }"
      no-caps
      flat
      padding="none"
      class="col-12"
    >
      <q-card class="row col-12">
        <q-card-section class="col-6 overflow-hidden" style="text-align:left">
          <div class="text-grey-14">{{ $t('tournament.name') }}:</div>
          <strong>{{ tournament.name }}</strong>
        </q-card-section>
        <q-card-section
          class="col-6"
          style="text-align:right"
          :style="tournament.isFinished ? 'color: orange' : 'color: green'"
        >
          {{ status }}
        </q-card-section>
      </q-card>
    </q-btn>
  </div>
</template>

<script lang="ts">
import Tournament from 'app/../shared/types/Tournament';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TournamentItemMobile extends Vue {
  @Prop({ type: Object }) tournament!: Tournament;

  get status() {
    return this.tournament.isFinished
      ? (this.$t('tournament.isFinishedTrue') as string)
      : (this.$t('tournament.isFinishedInProgress') as string);
  }
}
</script>
