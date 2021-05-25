<template>
  <div class="row col-12 justify-center" style="text-align:center">
    <h6 class="col-12 q-my-sm gt-xs">
      START DATE
    </h6>
    <q-date
      class="col-12 col-md-6 gt-xs"
      v-model="newDate"
      today-btn
      minimal
      first-day-of-week="1"
      @input="updateDate"
    />

    <q-input
      class="lt-sm col-12 q-mt-md"
      filled
      v-model="newDate"
      mask="date"
      :rules="['date']"
      label="startDate"
    >
      <template>
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date v-model="newDate">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </template>
    </q-input>
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
