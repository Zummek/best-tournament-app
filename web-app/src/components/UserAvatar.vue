<template>
  <q-avatar v-bind="avatarProps">
    <img v-if="userPhoto.startsWith('https')" :src="userPhoto" />
    <img v-else :src="'data:image/png;base64, ' + userPhoto" />
  </q-avatar>
</template>

<script lang="ts">
import User from 'app/../shared/types/User';
import { QAvatar } from 'quasar/dist/types';
import { Vue, Component, Prop } from 'vue-property-decorator';
import api from 'src/services/API';

interface AvatarProps extends Pick<QAvatar, 'size'> {
  class: string;
}

@Component
export default class UserAvatar extends Vue {
  @Prop({ type: Object, required: true }) readonly user!: User;
  @Prop({ type: Object, required: false }) readonly avatarProps!: AvatarProps;

  private userPhoto = 'https://cdn.quasar.dev/img/boy-avatar.png';

  private async mounted() {
    const response = await api.organization.getUserPhoto(this.user.id);
    if (response !== 'https://cdn.quasar.dev/img/boy-avatar.png') {
      this.userPhoto = response;
    }
  }
}
</script>
