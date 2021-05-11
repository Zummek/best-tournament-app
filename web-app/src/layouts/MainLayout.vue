<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <tool-bar />
    </q-header>

    <q-footer v-if="$q.screen.lt.sm" bordered>
      <navigation-tabs />
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ToolBar from 'components/mainLayout/ToolBar.vue';
import NavigationTabs from 'components/mainLayout/Navigation.vue';

@Component({ components: { ToolBar, NavigationTabs } })
export default class MainLayout extends Vue {}
</script>
