<template>
  <q-card class="q-pa-sm-xs q-mb-md">
    <q-card-section class="row no-wrap q-py-sm q-px-xs-sm q-px-sm-md">
      <div style="flex: 1; min-width: 150px">
        <div class="row no-wrap">
          <q-avatar
            class="self-end"
            size="md"
            style="margin-right: -8px; z-index: 10"
          >
            <!-- <img :src="match.sideA.team.members[1].avatarSrc" /> -->
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-avatar class="self-end" :size="$q.screen.xs ? 'lg' : 'xl'">
            <!-- <img :src="match.sideA.team.members[0].avatarSrc" /> -->
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <div
            :class="[
              'q-mx-md teamName',
              [$q.screen.xs ? 'self-center' : 'self-end'],
            ]"
          >
            {{ match.teamA.name }}
          </div>
        </div>

        <div v-if="$q.screen.xs" class="row no-wrap q-mt-sm">
          <q-avatar
            class="self-end"
            size="md"
            style="margin-right: -8px; z-index: 10"
          >
            <!-- <img :src="match.sideB.team.members[1].avatarSrc" /> -->
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-avatar class="self-end" size="lg">
            <!-- <img :src="match.sideB.team.members[0].avatarSrc" /> -->
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <div class="q-mx-md self-center teamName">
            {{ match.teamB.name }}
          </div>
        </div>
      </div>

      <q-separator v-if="$q.screen.xs" vertical inset />

      <div
        @mouseover="showActionButton = true"
        @mouseleave="showActionButton = false"
        style="height: 50px; min-width: 120px"
        class="q-ma-auto column self-center justify-center"
      >
        <!-- <div class="matchDate">{{ matchFormatedDate }}</div> -->
        <q-btn
          no-caps
          v-if="isAllowedToEditMatchScore"
          class="q-my-auto q-mx-auto"
          :color="scoreActionBtnColor"
          :label="scoreActionBtnLabel"
          @click="scoreActionBtnOnClick"
          :size="$q.screen.xs ? '12px' : '13px'"
          padding="xs sm"
        />
        <div v-else style="text-align: center">
          <div class="score q-mx-auto">{{ formatedScore }}</div>
          <div class="status q-mx-auto">{{ getMatchStatus }}</div>
        </div>
      </div>

      <div v-if="$q.screen.gt.xs" style="flex: 1; min-width: 150px">
        <div class="row no-wrap justify-end">
          <div class="q-mx-md teamName self-end text-right">
            {{ match.teamB.name }}
          </div>

          <q-avatar class="self-end" size="xl">
            <!-- <img :src="match.sideB.team.members[0].avatarSrc" /> -->
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-avatar
            class="self-end"
            size="md"
            style="margin-left: -8px; z-index: 10"
          >
            <!-- <img :src="match.sideA.team.members[1].avatarSrc" /> -->
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Match } from 'app/../shared/types/Tournament';
import store from '../../../store';
import { Vue, Component, Prop } from 'vue-property-decorator';
// import moment from 'moment';
import ScoreInputDialog from './ScoreInputDialog.vue';
import API from 'src/services/API';
import { UpdateTournamentMatchPayload } from 'src/services/API/apiResources/types';

@Component
export default class OutcomeTableItem extends Vue {
  @Prop({ type: Object, required: true }) readonly match!: Match;
  @Prop({ type: Boolean, required: true }) readonly isOwner!: boolean;
  @Prop({ type: String, required: true }) readonly tournamentId!: string;

  private showActionButton = false;

  // get matchFormatedDate() {
  //   return (
  //     moment(this.match.date).format('L') +
  //     ' ' +
  //     moment(this.match.date).format('LT')
  //   );
  // }

  get formatedScore() {
    if (this.match.score.final.a === -1) return '- : -';
    return `${this.match.score.final.a} : ${this.match.score.final.b}`;
  }

  get scoreActionBtnLabel() {
    if (this.isOwner && this.hasConflict)
      return this.$t('tournament.resolveConflict');
    return this.$t('tournament.addScore');
  }

  get scoreActionBtnColor() {
    if (this.isOwner && this.hasConflict) return 'negative';
    return 'primary';
  }

  get scoreActionBtnOnClick() {
    if (this.isOwner && this.hasConflict) return () => this.resolveConflict();
    return () => this.addScore();
  }

  get getAssignedTeam() {
    const currentUserId = store.state.currentUser.id;

    for (let i = 0; i < this.match.teamA.members.length; i++) {
      if (this.match.teamA.members[i].id === currentUserId) return 'teamA';
    }
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
      (!this.match.isFinished &&
        this.getAssignedTeam &&
        !this.isMyTeamAlreadyReportedScore) ||
      (this.isOwner && this.hasConflict)
    );
  }

  get getMatchStatus() {
    if (this.isMyTeamAlreadyReportedScore)
      return this.$t('tournament.scorePendingApproval');
    if (this.hasConflict) return this.$t('tournament.ownerMustResolveConflict');
  }

  private resolveConflict() {
    this.$q
      .dialog({
        component: ScoreInputDialog,
        parent: this,
        mode: 'resolving',
        teamAName: this.match.teamA.name,
        teamBName: this.match.teamB.name,
        score: this.match.score,
        isOwner: this.isOwner,
      })
      .onOk(async (data: UpdateTournamentMatchPayload) => {
        await API.tournament.updateTournamentMatch(
          this.tournamentId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.match._id!,
          data
        );
        this.$q.notify({
          message: this.$t(
            'tournament.scoreInputDialog.disputeBetweenTeamsHasBeenResolved'
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
        teamAName: this.match.teamA.name,
        teamBName: this.match.teamB.name,
        score: this.match.score,
        isOwner: this.isOwner,
      })
      .onOk(async (data: UpdateTournamentMatchPayload) => {
        await API.tournament.updateTournamentMatch(
          this.tournamentId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.match._id!,
          data
        );
        this.$q.notify({
          message: this.$t(
            'tournament.scoreInputDialog.addedScoreToMatch'
          ).toString(),
          color: 'primary',
        });
        this.$emit('refreshData');
      });
  }
}
</script>

<style lang="scss" scoped>
.matchDate {
  color: gray;
  font-size: smaller;
  text-align: center;
  line-height: 1.2;
}

.teamName {
  font-size: 15px;
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
