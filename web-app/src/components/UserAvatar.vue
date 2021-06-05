<template>
  <q-avatar v-bind="avatarProps">
    <img :src="userPhoto" />
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
    const response = (await api.organization.getUserPhoto(
      this.user.id
    )) as string;
    if (response !== 'https://cdn.quasar.dev/img/boy-avatar.png') {
      const byteCharacters = atob(response);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/Png' });
      this.userPhoto = URL.createObjectURL(blob);
    }
  }
}
</script>
