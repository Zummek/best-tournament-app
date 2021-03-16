<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-center lt-sm">
          <q-icon name="emoji_events" />
          Best tournament app
        </q-toolbar-title>
        <q-toolbar-title class="gt-xs">
          <q-icon name="emoji_events" />
          Best tournament app
        </q-toolbar-title>

        <div class="row gt-xs">
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

        <div class="column lt-sm">
          <div>
            <!-- Test -->
            <q-btn round class="q-ma-sm">
              <q-avatar size="40px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <q-menu anchor="bottom right" self="top right">
                <div class="row no-wrap q-pa-md justify-center">
                  <div class="column items-center">
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
                <q-separator horizontal class="q-mx-xs" />
                <div class="row  q-pa-md">
                  <div class="column items-center">
                    <div class="text-h6 q-mb-md">Settings</div>
                    It's me mario here. I will provide some setting later.
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer bordered class="bg-blue text-primary lt-sm">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
        v-model="tab"
      >
        <q-tab
          v-for="link in menuLinks"
          :label="link.title"
          :name="link.title"
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import MenuElement from '../components/MenuElement.vue';

const linksData = [
  {
    title: 'Tab1',
    link: '#',
  },
  {
    title: 'Tab2',
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
