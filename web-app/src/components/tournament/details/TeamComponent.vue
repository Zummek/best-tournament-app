<template>
  <q-card :flat="flat">
    <q-card-section class="row no-wrap" :class="{ 'q-pa-none': flat }">
      <div
        v-if="inverted"
        class="q-mx-md self-end text-right"
        :class="[textCenter ? 'self-center' : 'self-end']"
        style="font-size: 15px;"
      >
        {{ team.name }}
      </div>

      <q-avatar
        v-if="inverted"
        class="self-end"
        style="z-index: 10"
        :size="iconSize + 'px'"
      >
        <!-- <img :src="team.members[0].avatarSrc" /> -->
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
      <q-avatar
        class="self-end"
        :size="iconSize - 7 + 'px'"
        :style="inverted ? 'margin-left: -8px' : 'margin-right: -8px'"
      >
        <!-- <img :src="team.members[1].avatarSrc" /> -->
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
      <q-avatar
        v-if="!inverted"
        class="self-end"
        style="z-index: 10"
        :size="iconSize + 'px'"
      >
        <!-- <img :src="team.members[0].avatarSrc" /> -->
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>

      <div
        v-if="!inverted"
        class="q-mx-md"
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

@Component
export default class TeamComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly team!: Team;
  @Prop({ type: Boolean, default: false }) readonly flat!: boolean;
  @Prop({ type: Boolean, default: false }) readonly inverted!: boolean;
  @Prop({ type: Boolean, default: false }) readonly textCenter!: boolean;
  @Prop({ type: Number, default: 38 }) readonly iconSize!: number;
  @Prop({ type: Boolean, default: false }) readonly dense!: boolean;
}
</script>
