<template>
  <div class="row col-12" style="text-align:center">
    <h6 class="col-12 q-my-sm gt-xs">
      {{ $t('tournament.settings.matchDays') }}
    </h6>
    <div class="col-12 gt-xs">
      <q-checkbox
        v-for="item in daysOfWeek"
        :key="item.value"
        v-model="pickedDays"
        :val="item.value"
        :label="$t('common.daysOfWeek.' + item.value)"
        @input="updateDays"
      />
    </div>
    <div class="col-12 lt-sm q-mt-md">
      <q-select
        filled
        v-model="pickedDays"
        :options="daysOfWeek"
        :label="$t('tournament.settings.matchDays')"
        multiple
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DaysOfPlaySelector extends Vue {
  @Prop({ type: Array, required: true })
  days!: [];

  private pickedDays = this.days;

  private daysOfWeek = [
    {
      label: this.$t('common.daysOfWeek.monday') as string,
      value: 'monday',
    },
    {
      label: this.$t('common.daysOfWeek.tuesday') as string,
      value: 'tuesday',
    },
    {
      label: this.$t('common.daysOfWeek.wednesday') as string,
      value: 'wednesday',
    },
    {
      label: this.$t('common.daysOfWeek.thursday') as string,
      value: 'thursday',
    },
    {
      label: this.$t('common.daysOfWeek.friday') as string,
      value: 'friday',
    },
    {
      label: this.$t('common.daysOfWeek.saturday') as string,
      value: 'saturday',
    },
    {
      label: this.$t('common.daysOfWeek.sunday') as string,
      value: 'sunday',
    },
  ];

  updateDays() {
    this.$emit('update-days', this.pickedDays);
  }
}
</script>
