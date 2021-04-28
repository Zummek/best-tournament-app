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
        <q-card-section class="col-8 overflow-hidden" style="text-align:left">
          <div class="text-grey-14">{{ $t('tournament.name') }}:</div>
          <strong>{{ tournament.name }}</strong>
        </q-card-section>
        <q-card-section class="col-4 items-center" style="text-align:right">
          <q-icon
            size="3.5em"
            :name="
              tournament.type === 'single-elimination'
                ? 'emoji_events'
                : 'groups'
            "
            :style="tournament.isFinished ? 'color: orange' : 'color: green'"
          />
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
}
</script>
