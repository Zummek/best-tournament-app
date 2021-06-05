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

  private b64toBlob = (
    b64Data: string,
    contentType = 'image/Png',
    sliceSize = 512
  ) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  private async mounted() {
    const response = (await api.organization.getUserPhoto(
      this.user.id
    )) as string;
    if (response !== 'https://cdn.quasar.dev/img/boy-avatar.png') {
      const blob = this.b64toBlob(response);
      this.userPhoto = URL.createObjectURL(blob);
    }
  }
}
</script>
