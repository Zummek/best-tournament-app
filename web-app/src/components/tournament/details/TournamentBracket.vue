<template>
  <div class="row">
    <div class="col" v-if="remainingRounds - 1">
      <tournament-bracket
        v-if="match.childMatchAId"
        :matches="matches"
        :nextMatchId="match.childMatchAId"
        :isOwner="isOwner"
        :tournamentId="tournamentId"
        :remainingRounds="remainingRounds - 1"
        @refreshData="forwardRefreshData"
      />
      <div v-else class="teamPlaceholder" />
      <tournament-bracket
        v-if="match.childMatchBId"
        :matches="matches"
        :nextMatchId="match.childMatchBId"
        :isOwner="isOwner"
        :tournamentId="tournamentId"
        :remainingRounds="remainingRounds - 1"
        @refreshData="forwardRefreshData"
      />
      <div v-else class="teamPlaceholder" />
    </div>
    <div
      class="bracketConnectorContainer"
      v-if="match.childMatchAId || match.childMatchBId"
    >
      <div>
        <div
          v-if="match.childMatchAId"
          class="connector connectorTop"
          :style="verticalConnectorHeightStyle"
        />
        <div v-else class="connector" :style="verticalConnectorHeightStyle" />
        <div
          v-if="match.childMatchBId"
          class="connector connectorBottom"
          :style="verticalConnectorHeightStyle"
        />
        <div v-else class="connector" :style="verticalConnectorHeightStyle" />
      </div>
      <div class="connector connectorBottom" />
    </div>
    <div class="bracketMatchContainer">
      <tournament-bracket-match
        :match="match"
        :isOwner="isOwner"
        :tournamentId="tournamentId"
        @refreshData="forwardRefreshData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Match } from 'app/../shared/types/Tournament';
import TournamentBracketMatch from './TournamentBracketMatch.vue';

@Component({
  components: {
    TournamentBracketMatch,
  },
})
export default class TournamentBracket extends Vue {
  @Prop({ type: Array, required: true }) readonly matches!: Match[];
  @Prop({ type: String, required: true }) readonly nextMatchId!: string;
  @Prop({ type: Boolean, required: true }) readonly isOwner!: boolean;
  @Prop({ type: String, required: true }) readonly tournamentId!: string;
  @Prop({ type: Number, required: true }) readonly remainingRounds!: number;

  get match(): Match {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.matches.find(match => match.id === this.nextMatchId)!;
  }

  get verticalConnectorHeightStyle() {
    const height = (97 * 2 ** (this.remainingRounds - 2)) / 2;
    return 'height: ' + String(height) + 'px';
  }

  private forwardRefreshData() {
    this.$emit('refreshData');
  }
}
</script>

<style lang="scss" scoped>
.teamPlaceholder {
  height: 97px;
  width: 250px;
}
.bracketMatchContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.bracketConnectorContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.connector {
  width: 30px;
}
.connectorTop {
  border-right: 2px solid $secondary;
  border-top: 2px solid $secondary;
}
.connectorBottom {
  border-right: 2px solid $secondary;
  border-bottom: 2px solid $secondary;
}
</style>
