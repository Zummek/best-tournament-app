<template>
  <q-input
    dense
    debounce="300"
    :value="value"
    @input="onInput"
    :placeholder="$t('tournament.list.search')"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SearchBar extends Vue {
  @Prop({ type: String }) value!: string;

  onInput() {
    this.$emit('input', this.value);
  }
}
</script>
