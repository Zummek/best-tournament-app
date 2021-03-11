<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="page-container">
      <router-view @change-tab="value => (tab = value)" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class NonAppLayout extends Vue {}
</script>

<style lang="scss" scoped>
.page-container {
  background-color: $primary;
}
</style>
