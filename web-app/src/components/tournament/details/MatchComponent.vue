<template>
  <q-card
    class="q-pa-sm-xs q-mb-md"
    :class="[
      avaibilityClass,
      frameClass,
      { matchAsButton: isAllowedToEditMatchScore },
    ]"
    :style="small ? 'min-width: 300px' : 'min-width: 500px'"
    @click="scoreActionOnClick"
  >
    <q-card-section class="row no-wrap q-py-sm q-px-md justify-between">
      <div style="flex: 1; min-width: 190px">
        <team-component
          :team="match.teamA"
          flat
          :smallIcon="small"
          :textCenter="small"
          :class="avaibilityClass"
        />
        <team-component
          :class="avaibilityClass"
          v-if="small"
          textCenter
          smallIcon
          :team="match.teamB"
          flat
          class="q-mt-sm"
        />
      </div>

      <q-separator v-if="small" vertical inset />

      <div
        style="width: 100px"
        class="q-ma-auto q-mx-sm column self-center justify-center"
      >
        <div class="matchDate">{{ matchFormatedDate }}</div>
        <div style="text-align: center">
          <div v-if="!getMatchStatus" class="score q-mx-auto">
            {{ formatedScore }}
          </div>
          <div v-else class="status q-mx-auto">{{ getMatchStatus }}</div>
        </div>
      </div>

      <div v-if="!small" style="flex: 1; min-width: 190px">
        <team-component
          :team="match.teamB"
          flat
          inverted
          :class="avaibilityClass"
        />
      </div>
    </q-card-section>
    <q-tooltip
      v-if="isAllowedToEditMatchScore"
      :content-class="tooltipColor"
      content-style="font-size: 13px; z-index: 5000"
    >
      {{ tooltipContent }}
    </q-tooltip>
  </q-card>
</template>

<script lang="ts">
import { Match } from 'app/../shared/types/Tournament';
import store from '../../../store';
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import ScoreInputDialog from './ScoreInputDialog.vue';
import TeamComponent from '../details/TeamComponent.vue';
import API from 'src/services/API';
import { UpdateTournamentMatchPayload } from 'src/services/API/apiResources/types';

@Component({
  components: {
    TeamComponent,
  },
})
export default class MatchComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly match!: Match;
  @Prop({ type: Boolean, required: true }) readonly isOwner!: boolean;
  @Prop({ type: String, required: true }) readonly tournamentId!: string;
  @Prop({ type: Boolean, default: false }) readonly small!: boolean;

  get matchFormatedDate() {
    return moment(this.match.date).format('DD/MM/YY');
  }

  get avaibility() {
    return moment().isAfter(moment(this.match.date));
  }

  get avaibilityClass() {
    if (!this.avaibility) return 'matchNotAvaibleYet';
  }

  get frameClass() {
    if (this.avaibility) {
      if (!this.isAllowedToEditMatchScore) return '';

      if (this.isOwner && this.hasConflict) return 'matchConflictsFrame';
      return 'matchNewScoreFrame';
    }
  }

  get tooltipContent() {
    if (this.isOwner && this.hasConflict)
      return this.$t('tournament.match.resolveConflict');
    return this.$t('tournament.match.addScore');
  }

  get tooltipColor() {
    if (this.isOwner && this.hasConflict) return 'bg-negative';
    return 'bg-primary';
  }

  get formatedScore() {
    if (this.match.score.final.a === -1) return '- : -';
    return `${this.match.score.final.a} : ${this.match.score.final.b}`;
  }

  get scoreActionOnClick() {
    if (!this.isAllowedToEditMatchScore) return () => null;

    if (this.isOwner && this.hasConflict) return () => this.resolveConflict();
    return () => this.addScore();
  }

  get getAssignedTeam() {
    const currentUserId = store.state.currentUser.id;

    if (this.match.teamA)
      for (let i = 0; i < this.match.teamA.members.length; i++) {
        if (this.match.teamA.members[i].id === currentUserId) return 'teamA';
      }

    if (this.match.teamB)
      for (let i = 0; i < this.match.teamB.members.length; i++) {
        if (this.match.teamB.members[i].id === currentUserId) return 'teamB';
      }

    return false;
  }

  get isMyTeamAlreadyReportedScore() {
    if (this.getAssignedTeam === 'teamA')
      return this.match.score.reportedByA.a !== -1;
    else if (this.getAssignedTeam === 'teamB')
      return this.match.score.reportedByB.a !== -1;
    else return false;
  }

  get hasConflict() {
    return (
      this.match.score.reportedByA.a !== -1 &&
      this.match.score.reportedByB.a !== -1 &&
      JSON.stringify(this.match.score.reportedByA) !==
        JSON.stringify(this.match.score.reportedByB) &&
      !this.match.isFinished
    );
  }

  get isAllowedToEditMatchScore() {
    return (
      !this.match.isFinished &&
      this.avaibility &&
      ((this.getAssignedTeam && !this.isMyTeamAlreadyReportedScore) ||
        (this.isOwner && this.hasConflict))
    );
  }

  get getMatchStatus() {
    if (this.isMyTeamAlreadyReportedScore)
      return this.$t('tournament.match.scorePendingApproval');
    if (this.hasConflict)
      return this.$t('tournament.match.ownerMustResolveConflict');
  }

  private resolveConflict() {
    this.$q
      .dialog({
        component: ScoreInputDialog,
        parent: this,
        mode: 'resolving',
        teamAName: this.match.teamA?.name,
        teamBName: this.match.teamB?.name,
        score: this.match.score,
        isOwner: this.isOwner,
      })
      .onOk(async (data: UpdateTournamentMatchPayload) => {
        await API.tournament.updateTournamentMatch(
          this.tournamentId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.match.id!,
          data
        );
        this.$q.notify({
          message: this.$t(
            'tournament.match.scoreInputDialog.disputeBetweenTeamsHasBeenResolved'
          ).toString(),
          color: 'primary',
        });
        this.$emit('refreshData');
      });
  }

  private addScore() {
    this.$q
      .dialog({
        component: ScoreInputDialog,
        parent: this,
        mode: 'add',
        teamAName: this.match.teamA?.name,
        teamBName: this.match.teamB?.name,
        score: this.match.score,
        isOwner: this.isOwner,
      })
      .onOk(async (data: UpdateTournamentMatchPayload) => {
        await API.tournament.updateTournamentMatch(
          this.tournamentId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.match.id!,
          data
        );
        this.$q.notify({
          message: this.$t(
            'tournament.match.scoreInputDialog.addedScoreToMatch'
          ).toString(),
          color: 'primary',
        });
        this.$emit('refreshData');
      });
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/match.scss';

.matchDate {
  color: gray;
  font-size: smaller;
  text-align: center;
  line-height: 1.2;
}

.score {
  line-height: 1.12;
  font-size: xx-large;
  font-weight: 600;
}

.status {
  font-size: 11px;
  color: gray;
  font-weight: 400;
  max-width: 100px;
  text-align: center;
}
</style>
