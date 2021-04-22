<template>
  <q-avatar v-bind="avatarProps">
    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
  </q-avatar>
</template>

<script lang="ts">
import { QAvatar } from 'quasar/dist/types';
import { Vue, Component, Prop } from 'vue-property-decorator';

interface AvatarProps extends Pick<QAvatar, 'size'> {
  class: string;
}

@Component
export default class UserAvatar extends Vue {
  @Prop({ type: String, required: true }) readonly user!: string;
  @Prop({ type: Object, required: false }) readonly avatarProps!: AvatarProps;
}
</script>
