<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="row col-3 gt-xs">
          <HeaderMenuElement
            v-for="link in menuLinks"
            :key="link.title"
            v-bind="link"
          />
        </div>

        <q-toolbar-title class="lt-sm">
          <q-icon name="emoji_events" />
          Best tournament app
        </q-toolbar-title>
        <q-toolbar-title class="gt-xs text-center">
          <q-icon name="emoji_events" />
          Best tournament app
        </q-toolbar-title>

        <div class="row col-3 gt-xs justify-end">
          <div>
            <!-- Test -->
            <q-btn round class="q-ma-sm ">
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
                    It's me Mario here. I will provide some setting later.
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer bordered class="bg-primary text-primary lt-sm">
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-color="white"
        class="bg-primary text-grey-5 shadow-2"
      >
        <q-tab label="Tab1" name="Tab1" />
        <q-separator vertical class="q-mx-xs" />
        <q-tab label="Tab2" name="Tab2" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import HeaderMenuElement from '../components/HeaderMenuElement.vue';

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
  components: { HeaderMenuElement },
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  menuLinks = linksData;
}
</script>
