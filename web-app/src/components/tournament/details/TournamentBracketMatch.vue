<template>
  <q-card
    class="q-my-sm"
    :class="[
      avaibilityClass,
      frameClass,
      { matchAsButton: isAllowedToEditMatchScore },
    ]"
    style="width: 250px; height: 81px"
    @click="scoreActionOnClick"
  >
    <q-card-section class="row no-wrap q-pa-xs" style="padding: 6px">
      <div style="width: 192px">
        <team-component
          v-if="match.teamA"
          style="padding-bottom: 6px"
          :team="match.teamA"
          flat
          textCenter
          :iconSize="28"
          :class="avaibilityClass"
        />
        <div v-else style="height: 34px" />
        <q-separator />
        <team-component
          v-if="match.teamB"
          style="padding-top: 6px"
          :team="match.teamB"
          flat
          textCenter
          :iconSize="28"
          :class="avaibilityClass"
        />
        <div v-else style="height: 34px" />
      </div>

      <q-separator vertical inset />

      <div style="width: 45px">
        <div
          class="row justify-center items-center"
          style="font-size: 16px; height: 34px; padding-bottom: 6px"
        >
          {{ match.score.final.a !== -1 ? match.score.final.a : '-' }}
        </div>
        <q-separator />
        <div
          class="row justify-center items-center"
          style="font-size: 16px; height: 34px; padding-top: 6px"
        >
          {{ match.score.final.b !== -1 ? match.score.final.b : '-' }}
        </div>
      </div>
    </q-card-section>
    <q-tooltip
      v-if="isAllowedToEditMatchScore"
      :content-class="tooltipColor"
      content-style="font-size: 13px; z-index: 5000"
    >
      {{ tooltipContent }}
    </q-tooltip>
    <!-- <q-tooltip
      anchor="top middle"
      content-style="font-size: 10px; z-index: 5000"
    >
      {{ matchFormatedDate }}
    </q-tooltip> -->
    <q-badge color="grey" floating style="margin-top: -5px">{{
      matchFormatedDate
    }}</q-badge>
  </q-card>
</template>

<script lang="ts">
import { Match } from 'app/../shared/types/Tournament';
import store from '../../../store';
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import ScoreInputDialog from './ScoreInputDialog.vue';
import TeamComponent from './TeamComponent.vue';
import API from 'src/services/API';
import { UpdateTournamentMatchPayload } from 'src/services/API/apiResources/types';

@Component({
  components: {
    TeamComponent,
  },
})
export default class TournamentBracketMatch extends Vue {
  @Prop({ type: Object, required: true }) readonly match!: Match;
  @Prop({ type: Boolean, required: true }) readonly isOwner!: boolean;
  @Prop({ type: String, required: true }) readonly tournamentId!: string;

  get matchFormatedDate() {
    return moment(this.match.date).format('DD/MM/YY');
  }

  get avaibility() {
    console.log(moment().isAfter(moment(this.match.date)));
    if (this.match.date) return true;
    else return false;
  }

  get avaibilityClass() {
    if (this.avaibility) return 'matchNotAvaibleYet';
  }

  get frameClass() {
    if (!this.avaibility) {
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
      ((this.getAssignedTeam &&
        !this.isMyTeamAlreadyReportedScore &&
        this.match.teamA !== null &&
        this.match.teamB !== null) ||
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
</style>
