<template>
  <div class="row col-12 justify-center">
    <selectable-tournament-type
      v-for="item in tournamentTypesOptions"
      :key="item.type"
      :tournamentTypeName="item.label"
      :tournamentType="item.type"
      :iconName="item.icon"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SelectableTournamentType from './TournamentTypeSelectorItem.vue';

@Component({
  components: { SelectableTournamentType },
})
export default class TournamentTypeSelector extends Vue {
  private tournamentTypesOptions = [
    {
      label: this.$t('tournament.type.roundRobin') as string,
      type: 'round-robin',
      icon: 'groups',
    },
    {
      label: this.$t('tournament.type.singleElimination') as string,
      type: 'single-elimination',
      icon: 'emoji_events',
    },
  ];
}
</script>
