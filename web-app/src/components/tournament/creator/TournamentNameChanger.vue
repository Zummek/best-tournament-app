<template>
  <div
    class="cursor-pointer"
    :style="$q.screen.gt.xs ? '' : 'text-align:center'"
  >
    <h5 class="q-my-sm textWrapDotted" style="text-align:center">
      {{ newTournName }}
      <q-badge
        v-if="newTournName === $t('tournament.initName')"
        rounded
        outline
        color="grey"
        align="bottom"
        transparent
      >
        <q-icon name="edit" />
      </q-badge>
    </h5>

    <q-popup-edit
      v-model="newTournName"
      :validate="val => val.length > 3 && val.length < 40"
    >
      <template
        v-slot="{
          initialValue,
          value,
          emitValue,
          validate,
          set,
          cancel,
        }"
      >
        <q-input
          autofocus
          dense
          :value="newTournName"
          :hint="$t('tournament.name')"
          :rules="[
            val => validate(value) || $t('common.error.wrongInputLength'),
          ]"
          @input="emitValue"
        >
          <template v-slot:after>
            <q-btn
              flat
              dense
              color="negative"
              icon="cancel"
              @click.stop="cancel"
            />
            <q-btn
              flat
              dense
              color="positive"
              icon="check_circle"
              @click="updateTournamentName"
              @click.stop="set"
              :disable="validate(value) === false || initialValue === value"
            />
          </template>
        </q-input>
      </template>
    </q-popup-edit>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TournamentNameChanger extends Vue {
  @Prop({ type: String, required: true })
  tournamentName!: string;

  private newTournName = this.tournamentName;

  updateTournamentName() {
    this.$emit('update:tournamentName', this.newTournName);
  }
}
</script>
