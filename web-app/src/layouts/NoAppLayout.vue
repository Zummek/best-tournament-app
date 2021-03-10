<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="page-container">
      <router-view @change-tab="value => (tab = value)" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'NonAppLayout',
};
</script>

<style lang="scss" scoped>
.page-container {
  background-color: $primary;
}
</style>
