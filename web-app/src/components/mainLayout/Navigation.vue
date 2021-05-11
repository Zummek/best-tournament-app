<template>
  <q-tabs
    :align="$q.screen.lt.sm ? 'justify' : 'left'"
    indicator-color="transparent"
    active-color="white"
    class="bg-primary text-grey-5"
    :shrink="$q.screen.gt.xs"
  >
    <q-route-tab
      :to="{ name: 'News' }"
      :label="$t('mainLayout.tab.news')"
      name="News"
      :style="$q.screen.lt.sm ? '' : 'max-width:130px'"
      :class="$q.screen.lt.sm ? 'row col-6' : ''"
    />
    <q-route-tab
      :to="{ name: 'TournamentsList' }"
      :label="$t('mainLayout.tab.tournaments')"
      name="Tournaments"
      :style="$q.screen.lt.sm ? '' : 'max-width:150px'"
      :class="$q.screen.lt.sm ? 'row col-6' : ''"
    />
  </q-tabs>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Navigation extends Vue {}
</script>
