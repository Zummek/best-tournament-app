<template>
  <div>
    <tournament-item-mobile
      :tournaments="tournaments"
      :columns="columns"
      :query.sync="query"
      :pagination.sync="pagination"
    />
    <tournament-item-desktop
      :tournaments="tournaments"
      :columns="columns"
      :query.sync="query"
      :pagination.sync="pagination"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TournamentItemMobile from '../../components/tournament/list/TournamentItemMobile.vue';
import TournamentItemDesktop from '../../components/tournament/list/TournamentItemDesktop.vue';
import { IPagination } from '../../components/models';
import api from '../../services/API/index';
import { QTable } from 'quasar';

@Component({
  components: { TournamentItemMobile, TournamentItemDesktop },
})
export default class TournamentList extends Vue {
  private query = '';
  private pagination: IPagination = {
    page: 1,
    rowsPerPage: 1,
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

  get tournaments() {
    return (async () => {
      const tournamentsResponse = await api.tournament.getAllTournaments(
        this.pagination.page,
        1
      );
      this.pagination.rowsNumber = tournamentsResponse.totalRows;
      return tournamentsResponse.tournaments;
    })();
  }
}
</script>
