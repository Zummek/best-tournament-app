<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="lt-md"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <q-icon name="emoji_events" />
          Best tournament app
        </q-toolbar-title>
        <div class="row gt-sm">
          <!-- <q-item-label header>Options</q-item-label> -->
          <MenuElement
            v-for="link in menuLinks"
            :key="link.title"
            v-bind="link"
          />

          <!-- <q-btn-group>
            <q-btn stretch dense flat label="My Tournaments" />
          </q-btn-group> -->
          <div>
            <!-- Test -->
            <q-btn round class="q-ma-sm">
              <q-avatar size="50px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <q-menu anchor="bottom right" self="top right">
                <div class="row no-wrap q-pa-md">
                  <div class="column" style="flex: 2">
                    <div class="text-h6 q-mb-md">Settings</div>
                    It's me mario here.<br />
                    I will provide some setting here later.
                  </div>

                  <q-separator vertical inset class="q-mx-lg" />

                  <div class="column items-center" style="flex: 1">
                    <q-avatar size="72px">
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>

                    <div class="text-subtitle1 q-mt-md">Adam Kowalski</div>
                    <div class="text-weight-light q-mb-md">
                      mailkowalskiego@la.pl
                    </div>

                    <q-btn
                      color="primary"
                      label="Logout"
                      push
                      size="sm"
                      v-close-popup
                    />
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="250"
      :height="500"
      :breakpoint="1000" 
      bordered
      elevated
      content-class="bg-grey-1"
    >
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list>
          <MenuElement
            v-for="link in menuLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>

      <!-- TODO logo organizacji -->
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="75px" class="q-mb-sm">
            <!-- TODO Avatar użytkownika -->
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Adam Kowalski</div>
          <div>mailkowalskiego@la.pl</div>
        </div>
        <q-btn
          color="primary"
          label="Logout"
          push
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm"
        />
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import MenuElement from '../components/MenuElement.vue';

const linksData = [
  {
    title: 'Create new tournament',
    icon: 'add',
    link: '#',
  },
];

import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: { MenuElement },
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  menuLinks = linksData;
}
</script>
