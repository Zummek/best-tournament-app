<template>
  <div class="row col-12" style="text-align:center">
    <h6 class="col-12 q-my-sm">{{ $t('tournament.settings.matchFrequency') }}</h6>
    <q-slider
      v-model="newFreq"
      :min="1"
      :max="10"
      :step="1"
      snap
      label
      label-always
      color="primary"
      @input="updateDays"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Frequency extends Vue {
  @Prop({ type: Number, required: true })
  frequency!: number;

  private newFreq = this.frequency;

  updateDays() {
    this.$emit('update-freq', this.newFreq);
  }
}
</script>
