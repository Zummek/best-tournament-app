<template>
  <q-card>
    <q-card-section>
      <div class="row justify-between">
        <div class="q-dialog__message self-center">
          {{
            $t('tournament.match.scoreInputDialog.teamXReportedResult', {
              teamName: reportedByTeamName,
            })
          }}
        </div>
        <q-btn
          flat
          dense
          color="primary"
          :label="$t('tournament.match.scoreInputDialog.acceptScore')"
          size="12px"
          @click="acceptScore"
        />
      </div>
      <div class="row justify-center q-my-sm">
        <div class="teamName self-center">
          {{ teamAName }}
        </div>
        <div class="score self-center q-mx-md">
          {{ `${score.a} : ${score.b}` }}
        </div>
        <div class="teamName self-center">
          {{ teamBName }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Score } from 'app/../shared/types/Tournament';

@Component
export default class ScoreInputDialogTeamReport extends Vue {
  @Prop({ required: true }) score!: Score;
  @Prop({ required: true }) readonly reportedByTeamName!: string;
  @Prop({ required: true }) readonly teamAName!: string;
  @Prop({ required: true }) readonly teamBName!: string;

  acceptScore() {
    this.$emit('acceptScore');
  }
}
</script>

<style lang="scss" scoped>
.teamName {
  font-size: 15px;
}
.score {
  display: inline-block;
  line-height: 1.12;
  font-size: x-large;
  font-weight: 600;
  text-align: center;
}
</style>
