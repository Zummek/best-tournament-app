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
            {{ match.sideA.team.name }}
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
            {{ match.sideB.team.name }}
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
          v-if="
            (showActionButton && match.isFinished && getAssignedTeam) ||
              (!match.isFinished && getAssignedTeam)
          "
          class="q-my-auto q-mx-auto"
          :color="scoreActionBtnColor"
          :label="scoreActionBtnLabel"
          @click="scoreActionBtnOnClick"
          :size="$q.screen.xs ? '12px' : '13px'"
          padding="xs sm"
        />
        <div v-else class="score q-my-auto">
          {{ formatedScore }}
        </div>
      </div>

      <div v-if="$q.screen.gt.xs" style="flex: 1; min-width: 150px">
        <div class="row no-wrap justify-end">
          <div class="q-mx-md teamName self-end text-right">
            {{ match.sideB.team.name }}
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

  private showActionButton = false;

  // get matchFormatedDate() {
  //   return (
  //     moment(this.match.date).format('L') +
  //     ' ' +
  //     moment(this.match.date).format('LT')
  //   );
  // }

  get formatedScore() {
    if (this.match.sideA.score.a === -1) return '- : -';
    return `${this.match.sideA.score.a} : ${this.match.sideA.score.b}`;
  }

  get scoreActionBtnLabel() {
    if (this.match.sideA.score.a === -1) return this.$t('tournament.addScore');

    return this.$t('tournament.reportScore');
  }

  get scoreActionBtnColor() {
    if (this.match.sideA.score.a === -1) return 'primary';

    return 'negative';
  }

  get scoreActionBtnOnClick() {
    if (this.match.sideA.score.a === -1) return () => this.addScore();

    return () => this.reportScore();
  }

  get getAssignedTeam() {
    const currentUserId = store.state.currentUser.id;

    for (let i = 0; i < this.match.sideA.team.members.length; i++) {
      if (this.match.sideA.team.members[i].id === currentUserId)
        return 'sideA';
    }
    for (let i = 0; i < this.match.sideB.team.members.length; i++) {
      if (this.match.sideB.team.members[i].id === currentUserId)
        return 'sideB';
    }

    return false;
  }

  private reportScore() {
    this.$q.notify({
      message: 'Ta opcja jest jeszcze nie dostępna!',
      color: 'warning',
      textColor: 'black',
    });
    // second sprint
    // this.$q
    //   .dialog({
    //     component: ScoreInputDialog,
    //     mode: 'raport',
    //     title: 'Zgłoś wynik',
    //     message:
    //       'Jeśli uważasz, że wprowadzony wynik jest błędny popraw poniższy wynik i prześlij. Organizator rozstrzygnie spór.',
    //     sideAScore: this.match.sideA.score.a,
    //     sideBScore: this.match.sideA.score.b,
    //     sideAName: this.match.sideA.team.name,
    //     sideBName: this.match.sideB.team.name,
    //   })
    //   .onOk(() => {
    //     // TODO: call api, then
    //     this.$q.notify({
    //       message: 'Zgłoszono błędny wynik meczu!',
    //       color: 'warning',
    //       textColor: 'black',
    //     });
    //   });
  }

  private addScore() {
    this.$q
      .dialog({
        component: ScoreInputDialog,
        parent: this,
        mode: 'add',
        title: this.$t('tournament.score').toString(),
        message: this.$t('tournament.completeScoreAfterMatch').toString(),
        note: this.$t('tournament.competitorCanReportConflictNote').toString(),
        sideAName: this.match.sideA.team.name,
        sideBName: this.match.sideB.team.name,
      })
      .onOk(async (data: UpdateTournamentMatchPayload) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await API.tournament.updateTournamentMatch(this.match._id!, data);
        this.$q.notify({
          message: this.$t('tournament.addedScoreToMatch').toString(),
          color: 'primary',
        });
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
  display: inline-block;
  line-height: 1.12;
  font-size: xx-large;
  font-weight: 600;
  text-align: center;
}
</style>
