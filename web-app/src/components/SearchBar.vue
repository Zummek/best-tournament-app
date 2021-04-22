<template>
  <q-input
    dense
    debounce="300"
    :value="query"
    @input="onInput"
    :placeholder="$t('tournament.list.search')"
    :style="style"
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
  @Prop({ type: String }) query!: string;
  @Prop({ type: String, default: false }) mobile!: boolean;

  onInput(value: string) {
    this.$emit('update:query', value);
  }

  get style(): string | undefined {
    return this.mobile ? 'width:150px' : undefined;
  }
}
</script>
