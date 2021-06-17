<template>
  <div>
    <tournament-list-mobile
      v-if="tournaments"
      :tournaments="tournaments"
      :columns="columns"
      :query.sync="query"
      :pagination.sync="pagination"
    />
    <tournament-list-desktop
      v-if="tournaments"
      :tournaments="tournaments"
      :columns="columns"
      :query.sync="query"
      :pagination.sync="pagination"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AsyncComputed from 'vue-async-computed-decorator';
import TournamentListMobile from '../../components/tournament/list/TournamentListMobile.vue';
import TournamentListDesktop from '../../components/tournament/list/TournamentListDesktop.vue';
import { IPagination } from '../../components/models';
import api from '../../services/API/index';
import { QTable } from 'quasar';

@Component({
  components: { TournamentListMobile, TournamentListDesktop },
})
export default class TournamentList extends Vue {
  private query = '';
  private pagination: IPagination = {
    page: 1,
    rowsPerPage: 2,
    rowsNumber: 0,
  };
  private columns: QTable['columns'] = [
    {
      name: 'name',
      required: true,
      label: this.$t('tournament.name') as string,
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'status',
      align: 'right',
      label: this.$t('tournament.status.label') as string,
      field: 'status',
      sortable: true,
    },
  ];

  @AsyncComputed()
  async tournaments() {
    const tournamentsResponse = await api.tournament.getAllTournaments(
      this.pagination.page,
      6
    );
    this.pagination.rowsNumber = tournamentsResponse.totalRows;
    return tournamentsResponse.tournaments;
  }
}
</script>
