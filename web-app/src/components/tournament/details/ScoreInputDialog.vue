<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 444px">
      <q-form @submit="onOKClick">
        <q-card-section class="q-dialog__title">{{ title }}</q-card-section>
        <q-card-section class="q-dialog__message">{{ message }}</q-card-section>
        <q-card-section v-if="note" class="q-dialog__message">{{
          note
        }}</q-card-section>

        <q-card-section class="row justify-evenly">
          <q-input
            style="width: 45%"
            v-model="sideAScore"
            :label="`${$t('tournament.team')} ${sideAName}`"
            :placeholder="$t('tournament.score')"
            stack-label
            type="number"
            autofocus
            :rules="[
              val =>
                (val && Number.isInteger(+val) && val >= 0) ||
                $t('tournament.scoreShouldBePositiveInteger'),
            ]"
          />
          <q-input
            style="width: 45%"
            v-model="sideBScore"
            :label="`${$t('tournament.team')} ${sideBName}`"
            :placeholder="$t('tournament.score')"
            stack-label
            type="number"
            :rules="[
              val =>
                (val && Number.isInteger(+val) && val >= 0) ||
                $t('tournament.scoreShouldBePositiveInteger'),
            ]"
          />
          <div
            v-if="mode === 'raport'"
            v-show="showRaportError"
            class="errorMessage"
          >
            {{ $t('tournament.scoreReportError') }}
          </div>
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

@Component
export default class ScoreInputDialog extends Vue {
  @Prop({ required: true }) readonly mode!: string;
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly message!: string;
  @Prop({ required: true }) readonly note!: string;
  @Prop({ required: false, default: '' }) sideAScore!: number;
  @Prop({ required: false, default: '' }) sideBScore!: number;
  @Prop({ required: true }) readonly sideAName!: string;
  @Prop({ required: true }) readonly sideBName!: string;
  @Ref() readonly dialog!: QDialog;

  private sideAOrginalSorce = this.sideAScore;
  private sideBOrginalSorce = this.sideBScore;
  private showRaportError = false;

  show() {
    this.dialog.show();
  }

  hide() {
    this.dialog.hide();
  }

  onDialogHide() {
    this.$emit('hide');
  }

  onOKClick() {
    if (
      this.sideAScore === this.sideAOrginalSorce &&
      this.sideBScore === this.sideBOrginalSorce
    )
      this.showRaportError = true;
    else {
      this.$emit('ok', { sideA: this.sideAScore, sideB: this.sideBScore });
      this.hide();
    }
  }

  onCancelClick() {
    this.hide();
  }
}
</script>

<style lang="scss" scoped>
.errorMessage {
  color: $negative;
}
.btn-fixed-width {
  width: 80px;
}
</style>
