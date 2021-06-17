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

  private userPhoto = 'default-avatar.png';

  private created() {
    if (this.user.avatarSrc) this.userPhoto = this.user.avatarSrc;
    else {
      void api.organization.getUserPhoto(this.user.id).then(avatar => {
        if (avatar) this.userPhoto = avatar;
      });
    }
  }
}
</script>
