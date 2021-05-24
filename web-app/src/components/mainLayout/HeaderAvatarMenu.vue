<template>
  <div class="row col-4 justify-end">
    <q-btn round class="q-ma-sm">
      <user-avatar
        :avatar-props="$q.screen.lt.sm ? { size: '40px' } : { size: '50px' }"
        :user="$store.state.currentUser"
      />

      <q-menu anchor="bottom right" self="top right">
        <div
          class="row q-pa-md"
          :class="$q.screen.lt.sm ? 'justify-center' : ''"
        >
          <div class="row" v-if="$q.screen.gt.xs">
            <div class="col-4">
              <div class="text-center text-h6 q-mb-md">
                {{ $t('mainLayout.settings.label') }}
              </div>
              <change-lang />
            </div>

            <q-separator vertical inset class="q-mx-md" />

            <div class="col-6">
              <user-panel />
            </div>
          </div>

          <div v-if="$q.screen.lt.sm">
            <div class="col-12">
              <user-panel />
            </div>
            <q-separator horizontal class="q-mx-xs" />
            <div class="row col-12 justify-center q-pa-md">
              <div class="col-12 text-center text-h6 q-mb-md">
                {{ $t('mainLayout.settings.label') }}
              </div>
              <change-lang />
            </div>
          </div>
        </div>
      </q-menu>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ChangeLang from './ChangeLang.vue';
import UserPanel from './UserPanel.vue';
import UserAvatar from '../UserAvatar.vue';

@Component({
  components: {
    ChangeLang,
    UserPanel,
    UserAvatar,
  },
})
export default class HeaderAvatarMenu extends Vue {}
</script>
