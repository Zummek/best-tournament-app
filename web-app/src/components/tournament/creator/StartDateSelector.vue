<template>
  <div class="row col-12 justify-center" style="text-align:center">
    <h6 class="col-12 q-my-sm gt-xs">
      {{ $t('tournament.settings.dateLabel') }}
    </h6>
    <q-date
      class="col-12 col-md-6 gt-xs"
      v-model="newDate"
      minimal
      first-day-of-week="1"
      @input="updateDate"
      mask="M/DD/YYYY"
    />

    <q-btn class="lt-sm col-12 q-mt-md" icon="event" color="primary">
      {{ $t('tournament.settings.dateLabel') }}
      <q-popup-proxy transition-show="scale" transition-hide="scale">
        <q-date
          v-model="newDate"
          first-day-of-week="1"
          @input="updateDate"
          mask="M/DD/YYYY"
        >
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class StartDateSelector extends Vue {
  @Prop({ type: String, required: true })
  date!: string;

  private newDate = this.date;

  updateDate() {
    this.$emit('update-date', this.newDate);
  }
}
</script>
