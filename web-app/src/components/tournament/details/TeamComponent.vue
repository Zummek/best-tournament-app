<template>
  <q-card :flat="flat">
    <q-card-section
      class="row no-wrap"
      :class="{ 'q-pa-none': flat, 'justify-end': inverted }"
    >
      <div
        v-if="inverted"
        class="q-mr-xs text-right cut-name"
        :class="[textCenter ? 'self-center' : 'self-end']"
        style="font-size: 15px; flex: 1"
      >
        {{ team.name }}
      </div>

      <multiple-users-avatar
        :reverse="!inverted"
        :maxAvatars="2"
        :firstAvatarSize="iconSize"
        :restAvatarsSize="iconSize - 6"
        :users="team.members"
        :center="textCenter"
      />

      <div
        v-if="!inverted"
        class="q-ml-xs cut-name"
        :class="[textCenter ? 'self-center' : 'self-end']"
        style="font-size: 15px;"
      >
        {{ team.name }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Team } from 'app/../shared/types/Tournament';
import { Vue, Component, Prop } from 'vue-property-decorator';
import MultipleUsersAvatar from '../../MultipleUsersAvatar.vue';

@Component({
  components: {
    MultipleUsersAvatar,
  },
})
export default class TeamComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly team!: Team;
  @Prop({ type: Boolean, default: false }) readonly flat!: boolean;
  @Prop({ type: Boolean, default: false }) readonly inverted!: boolean;
  @Prop({ type: Boolean, default: false }) readonly textCenter!: boolean;
  @Prop({ type: Number, default: 38 }) readonly iconSize!: number;
}
</script>

<style lang="scss" scoped>
.cut-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
