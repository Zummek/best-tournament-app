<template>
  <q-toolbar>
    <div v-if="$q.screen.gt.xs" class="row col-4 gt-xs">
      <navigation-tabs />
    </div>
    <q-toolbar-title
      :class="$q.screen.gt.xs ? 'text-center gt-xs' : ''"
      style="overflow:visible"
    >
      <q-icon name="emoji_events" />
      Best tournament app
    </q-toolbar-title>

    <header-avatar-menu />
  </q-toolbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HeaderAvatarMenu from './HeaderAvatarMenu.vue';
import NavigationTabs from './Navigation.vue';

@Component({
  components: {
    HeaderAvatarMenu,
    NavigationTabs,
  },
})
export default class HeaderToolBar extends Vue {}
</script>
