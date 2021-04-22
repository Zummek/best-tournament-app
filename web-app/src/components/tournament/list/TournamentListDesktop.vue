<template>
  <div class="gt-xs row full-width justify-center">
    <div class="q-pa-md col-10 ">
      <q-table
        grid
        :data="tournaments"
        :columns="columns"
        row-key="id"
        :filter="query"
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top-left>
          <div class="row">
            <span class="title">{{ $t('tournament.list.label') }}</span>
            <q-btn
              :to="{ name: 'TournamentCreator' }"
              push
              color="primary"
              :label="$t('tournament.list.addNewBtn')"
            />
          </div>
        </template>

        <template v-slot:top-right>
          <search-bar :query.sync="query" />
        </template>

        <template v-slot:no-data>
          <empty-tournament-list />
        </template>

        <template v-slot:item="props">
          <tournament-item-desktop :tournament="props.row" />
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import Tournament from 'app/../shared/types/Tournament';
import { QTable } from 'quasar';
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator';
import { IPagination } from '../../models';
import UserAvatar from '../../UserAvatar.vue';
import EmptyTournamentList from './EmptyTournamentList.vue';
import TournamentItemDesktop from './TournamentItemDesktop.vue';

@Component({
  components: {
    UserAvatar,
    EmptyTournamentList,
    TournamentItemDesktop,
  },
})
export default class GridListDesktop extends Vue {
  @PropSync('query', { type: String, default: '' }) query!: string;
  @Prop({ type: Array, required: true }) readonly columns!: QTable['columns'];
  @Prop({ type: Array, default: () => [] }) readonly tournaments!: Tournament[];
  @PropSync('pagination', { type: Boolean, required: true })
  pagination!: IPagination;
}
</script>

<style lang="scss" scoped>
.card__logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card__header {
  font-size: 30px;
  font-weight: 400;
  padding: 0;
  margin: 0;
  text-align: center;
}
.title {
  font-size: 20px;
  letter-spacing: 0.005 em;
  font-weight: 400;
  padding-right: 10px;
}
</style>
