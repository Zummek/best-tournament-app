<template>
  <q-avatar v-bind="avatarProps">
    <!-- TODO: Replace with user.avatarSrc -->
    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
  </q-avatar>
</template>

<script lang="ts">
import User from 'app/../shared/types/User';
import { QAvatar } from 'quasar/dist/types';
import { Vue, Component, Prop } from 'vue-property-decorator';

interface AvatarProps extends Pick<QAvatar, 'size'> {
  class: string;
}

@Component
export default class UserAvatar extends Vue {
  @Prop({ type: Object, required: true }) readonly user!: User;
  @Prop({ type: Object, required: false }) readonly avatarProps!: AvatarProps;
}
</script>
