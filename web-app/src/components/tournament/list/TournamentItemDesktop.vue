<template>
  <div class="q-pa-sm col-sm-12 col-md-6 col-lg-4">
    <q-btn
      :to="{ name: 'TournamentDetails', params: { id: tournament.id } }"
      no-caps
      flat
      padding="none"
      class="col-12"
    >
      <q-card class="flex row">
        <q-card-section class="col-4 overflow-hidden card__logo">
          <q-icon size="5em" name="emoji_events" />
        </q-card-section>

        <q-card-section class="col-8 overflow-hidden">
          <div class="row justify-between items-center">
            <h3 class="card__header">{{ tournament.name }}</h3>
            <q-badge
              align="middle"
              outline
              rounded
              :color="tournament.isFinished ? 'orange' : 'green'"
              style="height: 35px;"
              :label="status"
            />
          </div>

          <div class="text-grey-14 " style="text-align:left">
            {{ $t('tournament.list.participants') }}:
          </div>
          <q-chip size="1em">
            <user-avatar :user="tournament.owner" />
            {{ $t('tournament.organizer') }}
          </q-chip>
          <user-avatar
            v-for="member in members"
            :key="member.id"
            :user="member"
            :avatar-props="{ size: '2em', class: 'q-ml-xs' }"
          />
        </q-card-section>
      </q-card>
    </q-btn>
  </div>
</template>

<script lang="ts">
import Tournament, { Team } from 'app/../shared/types/Tournament';
import User from 'app/../shared/types/User';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TournamentItemDesktop extends Vue {
  @Prop({ type: Object }) tournament!: Tournament;

  get members(): User[] {
    return this.tournament.teams.reduce(
      (members: User[], team: Team) => [...members, ...team.members],
      []
    );
  }

  get status() {
    this.tournament.isFinished
            ? (this.$t('tournament.isFinishedTrue') as string)
            : (this.$t('tournament.isFinishedInProgress') as string),
  }
}
</script>
