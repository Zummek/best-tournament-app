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
            :label="`Drużyna ${sideAName}`"
            placeholder="Wynik"
            stack-label
            type="number"
            autofocus
            :rules="[
              val =>
                (val && Number.isInteger(+val) && val >= 0) ||
                'Wynik powinien być dodatnią liczbą całkowitą',
            ]"
          />
          <q-input
            style="width: 45%"
            v-model="sideBScore"
            :label="`Drużyna ${sideBName}`"
            placeholder="Wynik"
            stack-label
            type="number"
            :rules="[
              val =>
                (val && Number.isInteger(+val) && val >= 0) ||
                'Wynik powinien być dodatnią liczbą całkowitą',
            ]"
          />
          <div
            v-if="mode === 'raport'"
            v-show="showRaportError"
            class="errorMessage"
          >
            Jeśli zgłaszasz błędny wynik meczu to poprawiona wersja powinna się
            różnić od tej pierwotnej.
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Anuluj"
            @click="onCancelClick"
            outline
            class="btn-fixed-width"
          />
          <q-btn
            color="primary"
            label="OK"
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
  @Prop({ required: true }) readonly sideAScore!: number;
  @Prop({ required: true }) readonly sideBScore!: number;
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.$emit('hide');
  }

  onOKClick() {
    if (
      this.sideAScore === this.sideAOrginalSorce &&
      this.sideBScore === this.sideBOrginalSorce
    )
      this.showRaportError = true;
    else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$emit('ok');
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
