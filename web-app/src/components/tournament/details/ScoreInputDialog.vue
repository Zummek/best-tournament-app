<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 444px">
      <q-form @submit="onOKClick">
        <q-card-section class="q-dialog__title">{{ getTitle }}</q-card-section>
        <q-card-section class="q-dialog__message">{{
          getMessage
        }}</q-card-section>

        <q-card-section v-if="score.reportedByA.a !== -1">
          <score-input-dialog-team-report
            :reportedByTeamName="teamAName"
            :teamAName="teamAName"
            :teamBName="teamBName"
            :score="score.reportedByA"
            @acceptScore="acceptScore('teamA')"
          />
        </q-card-section>
        <q-card-section v-if="score.reportedByB.a !== -1">
          <score-input-dialog-team-report
            :reportedByTeamName="teamBName"
            :teamAName="teamAName"
            :teamBName="teamBName"
            :score="score.reportedByB"
            @acceptScore="acceptScore('teamB')"
          />
        </q-card-section>

        <q-card-section class="row justify-evenly">
          <q-input
            style="width: 45%"
            v-model="valueTeamAScore"
            :label="`${$t('tournament.team.label')} ${teamAName}`"
            :placeholder="$t('tournament.match.score')"
            stack-label
            type="number"
            autofocus
            :rules="[
              val =>
                (val && Number.isInteger(+val) && val >= 0) ||
                $t('tournament.match.scoreInputDialog.scoreShouldBePositiveInteger'),
            ]"
          />
          <q-input
            style="width: 45%"
            v-model="valueTeamBScore"
            :label="`${$t('tournament.team.label')} ${teamBName}`"
            :placeholder="$t('tournament.match.score')"
            stack-label
            type="number"
            :rules="[
              val =>
                (val && Number.isInteger(+val) && val >= 0) ||
                $t('tournament.match.scoreInputDialog.scoreShouldBePositiveInteger'),
            ]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            :label="$t('common.cancel')"
            @click="onCancelClick"
            outline
            class="btn-fixed-width"
          />
          <q-btn
            color="primary"
            :label="$t('common.ok')"
            type="submit"
            class="btn-fixed-width"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import { QDialog } from 'quasar';
import { MatchScore } from 'app/../shared/types/Tournament';
import ScoreInputDialogTeamReport from './ScoreInputDialogTeamReport.vue';

@Component({
  components: {
    ScoreInputDialogTeamReport,
  },
})
export default class ScoreInputDialog extends Vue {
  @Prop({ required: true }) readonly mode!: string;
  @Prop({ required: true }) score!: MatchScore;
  @Prop({ required: true }) readonly teamAName!: string;
  @Prop({ required: true }) readonly teamBName!: string;
  @Prop({ required: true }) readonly isOwner!: boolean;
  @Ref() readonly dialog!: QDialog;

  private valueTeamAScore = '';
  private valueTeamBScore = '';

  get getTitle() {
    if (this.mode === 'resolving')
      return this.$t('tournament.match.resolveConflict');
    else return this.$t('tournament.match.score');
  }

  get getMessage() {
    if (this.mode === 'resolving')
      return this.$t(
        'tournament.match.scoreInputDialog.solveConflictBetweenTeamsMessage'
      );
    if (this.score.reportedByA.a !== -1 || this.score.reportedByB.a !== -1)
      return this.$t(
        'tournament.match.scoreInputDialog.enterScoreOrAcceptAlreadyGiven'
      );
    else return this.$t('tournament.match.scoreInputDialog.completeScoreAfterMatch');
  }

  show() {
    this.dialog.show();
  }

  hide() {
    this.dialog.hide();
  }

  onDialogHide() {
    this.$emit('hide');
  }

  acceptScore(team: string) {
    if (team === 'teamA') {
      this.$emit('ok', {
        teamA: this.score.reportedByA.a,
        teamB: this.score.reportedByA.b,
      });
    } else {
      this.$emit('ok', {
        teamA: this.score.reportedByB.a,
        teamB: this.score.reportedByB.b,
      });
    }
    this.hide();
  }

  onOKClick() {
    this.$emit('ok', {
      teamA: this.valueTeamAScore,
      teamB: this.valueTeamBScore,
    });
    this.hide();
  }

  onCancelClick() {
    this.hide();
  }
}
</script>

<style lang="scss" scoped>
.btn-fixed-width {
  width: 80px;
}
</style>
