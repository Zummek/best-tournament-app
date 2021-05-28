<template>
  <div class="row no-wrap" :class="reverse ? 'reverse' : ''">
    <user-avatar
      style="z-index: 100"
      :avatar-props="{ size: firstAvatarSize + 'px' }"
      :user="users[0]"
    />
    <user-avatar
      :class="center ? 'self-center' : 'self-end'"
      v-for="(user, index) in restUsers"
      :style="{
        margin: reverse ? '0 -8px 0 0' : '0 0 0 -8px',
        'z-index': 99 - index,
      }"
      :key="user.id"
      :avatar-props="{ size: restAvatarsSize + 'px' }"
      :user="user"
    />

    <q-avatar
      v-if="users.length > maxAvatars"
      :class="center ? 'self-center' : 'self-end'"
      :size="restAvatarsSize + 'px'"
      :style="{
        margin: reverse ? '0 -5px 0 0' : '0 0 0 -5px',
        'z-index': 99 - users.length,
      }"
      color="grey-4"
      text-color="black"
      font-size="10px"
    >
      {{ '+' + (users.length - maxAvatars + 1) }}
    </q-avatar>
    <q-tooltip>
      <div v-html="tooltipUserList"></div>
    </q-tooltip>
  </div>
</template>

<script lang="ts">
import User from 'app/../shared/types/User';
import { Vue, Component, Prop } from 'vue-property-decorator';
import UserAvatar from './UserAvatar.vue';

@Component({
  components: {
    UserAvatar,
  },
})
export default class MultipleUsersAvatar extends Vue {
  @Prop({ type: Object, required: true }) readonly users!: User[];
  @Prop({ type: Number, default: 36 }) readonly firstAvatarSize!: number;
  @Prop({ type: Number, default: 28 }) readonly restAvatarsSize!: number;
  @Prop({ type: Number, default: 2 }) readonly maxAvatars!: number;
  @Prop({ type: Boolean, default: false }) readonly center!: boolean;
  @Prop({ type: Boolean, default: false }) readonly reverse!: boolean;

  mounted() {
    if (this.maxAvatars < 2) {
      console.warn(
        'Prop maxAvatars in MultipleUsersAvatar has a limitation: min 2'
      );
    }
  }

  get restUsers() {
    if (this.users.length > this.maxAvatars)
      return this.users.slice(1, this.maxAvatars - 1);
    else return this.users.slice(1);
  }

  get tooltipUserList() {
    let stringList = '';

    for (let i = 0; i < this.users.length; i++) {
      stringList += `• ${this.users[i].firstName} ${this.users[i].lastName}<br/>`;
    }
    return stringList;
  }
}
</script>
