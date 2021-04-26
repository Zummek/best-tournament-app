<template>
  <div class="row col-8 col-sm-4 justify-center q-ma-md">
    <q-btn class="row col-12" no-caps padding="none">
      <q-card
        flat
        class="col-12 tournamentTypeCard"
        @click="updateTournamentType"
      >
        <q-icon class="col-12" :name="iconName" style="font-size: 1000%" />
        <div class="text-h6">{{ tournamentTypeName }}</div>
      </q-card>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import EventBus from '../../../services/EventBus';

@Component
export default class SelectableTournamentType extends Vue {
  @Prop({ type: String, required: true }) readonly tournamentTypeName!: string;
  @Prop({ type: String, required: true }) readonly tournamentType!: string;
  @Prop({ type: String, required: true }) readonly iconName!: string;

  private updateTournamentType() {
    EventBus.$emit('updateActiveTournamentType', this.tournamentType);
  }
}
</script>

<style scoped>
.tournamentTypeCard:hover {
  background-color: lightgray;
}
</style>
