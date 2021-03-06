<template>
  <div class="q-pa-xl col-sm-12 col-md-6 col-lg-4">
    <q-btn
      :to="{ name: 'TournamentDetails', params: { id: tournament.id } }"
      no-caps
      flat
      padding="none"
      :style="{ width: '100%' }"
    >
      <q-card class="card__container">
        <q-card-section class="col-4 overflow-hidden card__logo">
          <q-icon
            size="5em"
            :name="
              tournament.type === 'single-elimination'
                ? 'emoji_events'
                : 'groups'
            "
          />
        </q-card-section>

        <q-card-section class="overflow-hidden card__content">
          <div class="card__container--header">
            <h3 class="card__header">{{ tournament.name }}</h3>
            <q-badge
              align="middle"
              outline
              rounded
              :color="tournament.isFinished ? 'green' : 'orange'"
              style="height: 35px;"
              :label="status"
            />
          </div>

          <div class="text-grey-14 card__participants">
            <div style="width: 100%">
              {{ $t('tournament.list.participants') }}:
              <br />
              <q-chip size="1em">
                <user-avatar :user="tournament.owner" />
                {{
                  tournament.owner.firstName + ' ' + tournament.owner.lastName
                }}
              </q-chip>
              <user-avatar
                v-for="(member, i) in members"
                :key="member.id + ' ' + i"
                :user="member"
                :avatar-props="{ size: '2em', class: 'q-ml-xs' }"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-btn>
  </div>
</template>

<script lang="ts">
import Tournament, { Team } from 'app/../shared/types/Tournament';
import User from 'app/../shared/types/User';
import { Vue, Component, Prop } from 'vue-property-decorator';
import UserAvatar from '../../UserAvatar.vue';

@Component({
  components: {
    UserAvatar,
  },
})
export default class TournamentItemDesktop extends Vue {
  @Prop({ type: Object }) tournament!: Tournament;

  get members(): User[] {
    return this.tournament.teams.reduce(
      (members: User[], team: Team) => [...members, ...team.members],
      []
    );
  }

  get status() {
    return this.tournament.isFinished
      ? (this.$t('tournament.status.finished') as string)
      : (this.$t('tournament.status.inProgress') as string);
  }
}
</script>
<style lang="scss" scoped>
.card__container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 170px;
}
.card__container--header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 95%;
}
.card__logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card__content {
  width: 100%;
}
.card__header {
  font-size: 25px;
  font-weight: 400;
  padding: 0;
  margin: 0;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.card__participants {
  display: flex;
  text-align: left;
  width: 95%;
  height: 88px;
  overflow: hidden;
}
.title {
  font-size: 20px;
  letter-spacing: 0.005 em;
  font-weight: 400;
  padding-right: 10px;
}
</style>
