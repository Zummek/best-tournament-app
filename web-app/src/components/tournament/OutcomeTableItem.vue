<template>
  <q-card>
    <q-card-section class="row q-my-md" style="width: 600px">
      <q-avatar
        class="self-end"
        size="md"
        style="margin-right: -10px; z-index: 10"
      >
        <img :src="match.sideA.team.members[1].avatarSrc" />
      </q-avatar>
      <q-avatar class="self-end" size="xl">
        <img :src="match.sideA.team.members[0].avatarSrc" />
      </q-avatar>

      <div class="q-mx-md self-end teamName">
        {{ match.sideA.team.name }}
      </div>

      <div
        @mouseover="showActionButton = true"
        @mouseleave="showActionButton = false"
        style="height: 50px"
      >
        <div class="matchDate">{{ matchFormatedDate }}</div>
        <div
          v-if="!showActionButton && match.isFinished"
          class="score full-width text-center"
        >
          {{ formatedScore }}
        </div>
        <div v-else class="full-width text-center q-mt-xs">
          <q-btn
            :color="scoreActionBtnColor"
            :label="scoreActionBtnLabel"
            @click="scoreActionBtnOnClick"
            size="md"
            dense
          />
        </div>
      </div>

      <div class="q-mx-md self-end teamName text-right">
        {{ match.sideB.team.name }}
      </div>

      <q-avatar class="self-end" size="xl">
        <img :src="match.sideB.team.members[0].avatarSrc" />
      </q-avatar>
      <q-avatar
        class="self-end"
        size="md"
        style="margin-left: -10px; z-index: 10"
      >
        <img :src="match.sideA.team.members[1].avatarSrc" />
      </q-avatar>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Match } from 'app/../shared/types/Tournament';
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import ScoreInputDialog from '../../components/tournament/ScoreInputDialog.vue';

@Component
export default class OutcomeTableItem extends Vue {
  @Prop({ type: Object, required: true }) readonly match!: Match;

  private showActionButton = false;

  get matchFormatedDate() {
    return (
      moment(this.match.date).format('L') +
      ' ' +
      moment(this.match.date).format('LT')
    );
  }

  get formatedScore() {
    if (this.match.sideA.score.a === -1) return '- : -';
    return `${this.match.sideA.score.a} : ${this.match.sideA.score.b}`;
  }

  get scoreActionBtnLabel() {
    if (this.match.sideA.score.a === -1) return 'Dodaj wynik';

    return 'Zgłoś wynik';
  }

  get scoreActionBtnColor() {
    if (this.match.sideA.score.a === -1) return 'primary';

    return 'negative';
  }

  get scoreActionBtnOnClick() {
    if (this.match.sideA.score.a === -1) return () => this.addScore();

    return () => this.reportScore();
  }

  get ifUserHasPermsToMatch() {
    // TODO: make current user store
    return true;
  }

  private reportScore() {
    this.$q
      .dialog({
        component: ScoreInputDialog,
        mode: 'raport',
        title: 'Zgłoś wynik',
        message:
          'Jeśli uważasz, że wprowadzony wynik jest błędny popraw poniższy wynik i prześlij. Organizator rozstrzygnie spór.',
        sideAScore: this.match.sideA.score.a,
        sideBScore: this.match.sideA.score.b,
        sideAName: this.match.sideA.team.name,
        sideBName: this.match.sideB.team.name,
      })
      .onOk(() => {
        // TODO: call api, then
        this.$q.notify({
          message: 'Zgłoszono błędny wynik meczu!',
          color: 'warning',
          textColor: 'black',
        });
      });
  }

  private addScore() {
    this.$q
      .dialog({
        component: ScoreInputDialog,
        parent: this,
        mode: 'add',
        title: 'Wynik',
        message: 'Uzupełnij wynik po rozegranym meczu.',
        note:
          'Rywal będzie mógł zgłościć konflikt w przypadku gdy podasz błędny wynik.',
        sideAScore: '',
        sideBScore: '',
        sideAName: this.match.sideA.team.name,
        sideBName: this.match.sideB.team.name,
      })
      .onOk(() => {
        // TODO: call api, then
        this.$q.notify({
          message: 'Dodano wynik meczu!',
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
  font-size: 18px;
  flex: 1;
}

.score {
  display: inline-block;
  line-height: 1.12;
  font-size: xx-large;
  font-weight: 600;
}
</style>
