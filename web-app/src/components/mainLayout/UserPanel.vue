<template>
  <div class="column items-center q-pb-md">
    <q-avatar size="72px">
      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      <!-- TODO user avatar -->
    </q-avatar>

    <div class="text-subtitle1 q-mt-md">
      {{ currentUser.firstName }} {{ currentUser.lastName }}
    </div>
    <div class="text-weight-light q-mb-md">
      {{ currentUser.email }}
    </div>

    <q-btn
      color="primary"
      :label="$t('mainLayout.logout')"
      push
      outline
      size="12px"
      v-close-popup
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import User from 'app/../shared/types/User';
import store from 'src/store';

@Component({})
export default class UserPanel extends Vue {
  private currentUser: User = store.state.currentUser;
}
</script>
