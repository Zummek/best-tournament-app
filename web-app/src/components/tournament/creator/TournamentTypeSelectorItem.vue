<template>
  <div class="row col-8 col-sm-4 justify-center q-ma-md">
    <q-btn class="row col-12 selectorButton" no-caps padding="none">
      <q-card
        flat
        class="row col-12 tournamentTypeCard items-center"
        :class="tournamentType === activeType ? 'activeTypeCard' : ''"
        @click="updateTournamentType"
      >
        <q-icon class="col-12" :name="iconName" style="font-size: 1000%" />
        <div class="text-h6 col-12" style="text-align:center">
          {{ $t('tournament.type.' + tournamentType) }}
        </div>
      </q-card>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { TournamentType } from 'app/../shared/types/Tournament';
import { Vue, Component, Prop } from 'vue-property-decorator';
import EventBus from '../../../services/EventBus';

@Component
export default class SelectableTournamentType extends Vue {
  @Prop({ type: String, required: true })
  readonly tournamentType!: TournamentType;
  @Prop({ type: String, required: true }) readonly iconName!: string;
  @Prop({ type: String, required: true })
  readonly activeType!: TournamentType | null;

  private updateTournamentType() {
    EventBus.$emit('updateActiveTournamentType', this.tournamentType);
  }
}
</script>

<style scoped>
.selectorButton,
.tournamentTypeCard {
  width: 300px;
  height: 200px;
}

.activeTypeCard {
  background: rgb(185, 183, 183);
}
.tournamentTypeCard {
  transition-duration: 0.5s;
}
.tournamentTypeCard:hover {
  background-color: lightgray;
  transition-duration: 0.5s;
}
</style>
