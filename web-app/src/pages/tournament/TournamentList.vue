<template>
  <div>
    <grid-list-mobile
      :data="trueData"
      :columns="columns"
      :query.sync="query"
      :pagination.sync="pagination"
    />
    <grid-list-desktop
      :data="trueData"
      :columns="columns"
      :query.sync="query"
      :pagination.sync="pagination"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import GridListMobile from '../../components/tournament/GridListMobile.vue';
import GridListDesktop from '../../components/tournament/GridListDesktop.vue';
import { IPagination } from '../../components/models';
import api from '../../services/API/index';
import { QTable } from 'quasar';
@Component({
  components: { GridListMobile, GridListDesktop },
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
    const tournamentsResponse = await api.tournament.getAllTournaments(
      this.pagination.page,
      1
    );
    this.pagination.rowsNumber = tournamentsResponse.totalRows;
    return tournamentsResponse.tournaments;
  }
}
</script>
