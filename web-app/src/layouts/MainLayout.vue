<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="row col-4 gt-xs">
          <q-tabs
            align="left"
            indicator-color="transparent"
            active-color="white"
            class="bg-primary text-grey-5"
            shrink
          >
            <q-route-tab
              :to="{ name: 'News' }"
              :label="$t('mainLayout.tab.news')"
              name="News"
              style="max-width:130px"
            />
            <q-route-tab
              :to="{ name: 'TournamentsList' }"
              :label="$t('mainLayout.tab.tournaments')"
              name="Tournaments"
              style="max-width:150px"
            />
          </q-tabs>
        </div>

        <q-toolbar-title
          :class="$q.screen.gt.xs ? 'text-center gt-xs' : ''"
          style="overflow:visible"
        >
          <q-icon name="emoji_events" />
          Best tournament app
        </q-toolbar-title>

        <div class="row col-4 gt-xs justify-end">
          <q-btn round class="q-ma-sm ">
            <q-avatar size="50px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <q-menu anchor="bottom right" self="top right">
              <div class="row no-wrap q-pa-md">
                <div class="column" style="flex: 2">
                  <div class="text-h6 q-mb-md">{{ $t('mainLayout.settings.label') }}</div>
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
                    :label="$t('mainLayout.logout')"
                    push
                    size="sm"
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>

        <div class="column lt-sm">
          <div>
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
                      :label="$t('mainLayout.logout')"
                      push
                      size="sm"
                      v-close-popup
                    />
                  </div>
                </div>
                <q-separator horizontal class="q-mx-xs" />
                <div class="row  q-pa-md">
                  <div class="column items-center">
                    <div class="text-h6 q-mb-md">{{ $t('mainLayout.settings.label') }}</div>
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
        align="justify"
        indicator-color="transparent"
        active-color="white"
        class="bg-primary text-grey-5 shadow-2"
      >
        <q-route-tab
          :to="{ name: 'News' }"
          :label="$t('mainLayout.tab.news')"
          name="News"
          class="row col-6"
        />
        <q-separator vertical class="q-mx-xs" />
        <q-route-tab
          :to="{ name: 'TournamentsList' }"
          :label="$t('mainLayout.tab.tournaments')"
          name="Tournaments"
          class="row col-6"
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MainLayout extends Vue {}
</script>
