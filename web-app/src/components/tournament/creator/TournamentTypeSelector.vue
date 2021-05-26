<template>
  <div class="row col-12 justify-center">
    <selectable-tournament-type
      v-for="item in tournamentTypesOptions"
      :key="item.type"
      :tournamentType="item.type"
      :iconName="item.icon"
      :activeType="activeType"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SelectableTournamentType from './TournamentTypeSelectorItem.vue';
import { TournamentType } from 'app/../shared/types/Tournament';

@Component({
  components: { SelectableTournamentType },
})
export default class TournamentTypeSelector extends Vue {
  @Prop({ required: true })
  activeType!: TournamentType | null;

  private tournamentTypesOptions = [
    {
      type: 'round-robin',
      icon: 'groups',
    },
    {
      type: 'single-elimination',
      icon: 'emoji_events',
    },
  ];
}
</script>
