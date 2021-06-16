<template>
  <div class="column items-center q-pb-md">
    <user-avatar :avatar-props="{ size: '72px' }" :user="currentUser" />

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
      @click="logout"
      v-close-popup
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import User from 'app/../shared/types/User';
import UserAvatar from '../UserAvatar.vue';
import store from 'src/store';

@Component({
  components: {
    UserAvatar,
  },
})
export default class UserPanel extends Vue {
  private currentUser: User = store.state.currentUser;

  private async logout() {
    store.commit('currentUser/logOut');
    this.$cookies.remove('jwt');
    await this.$router.replace('/login');
  }
}
</script>
