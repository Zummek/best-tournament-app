<template>
  <div class="q-pa-md lt-sm">
    <q-table
      grid
      :title="$t('tournament.list.label')"
      :data="tournaments"
      :columns="columns"
      row-key="id"
      :filter="query"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <search-bar :query.sync="query" mobile />
      </template>

      <template v-slot:no-data>
        <empty-tournament-list />
      </template>

      <template v-slot:item="props">
        <tournament-item-mobile :tournament="props.row" />
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[36, 18]">
      <q-btn
        :to="{ name: 'TournamentCreator' }"
        round
        color="primary"
        icon="add"
      />
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import Tournament from 'app/../shared/types/Tournament';
import { QTable } from 'quasar';
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator';
import { IPagination } from '../models';

@Component
export default class GridListMobile extends Vue {
  @PropSync({ type: String, default: () => '' }) query!: string;
  @Prop({ type: Array, required: true }) readonly columns!: QTable['columns'];
  @Prop({ type: Array, default: () => [] }) readonly tournaments!: Tournament[];
  @PropSync({ type: Object, required: true }) pagination!: IPagination;
}
</script>
