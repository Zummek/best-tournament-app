<template>
  <q-table
    :data="teamsScores"
    virtual-scroll
    :columns="columns"
    :pagination="pagination"
    row-key="name"
    :filter="filter"
    :rows-per-page-options="[0]"
    hide-bottom
    :loading="loading"
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template v-slot:body="props">
      <q-tr
        :props="props"
        :class="
          props.pageIndex === 0
            ? 'bg-green-4'
            : props.pageIndex === 1
            ? 'bg-green-3'
            : props.pageIndex === 2
            ? 'bg-green-2'
            : 'bg-white text-black'
        "
      >
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="wins" :props="props">
          {{ props.row.wins }}
        </q-td>
        <q-td key="draws" :props="props">
          {{ props.row.draws }}
        </q-td>
        <q-td key="loses" :props="props">
          {{ props.row.loses }}
        </q-td>
        <q-td key="points" :props="props">
          {{ props.row.points }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script lang="ts">
import { PointsPerTeam } from 'app/../shared/types/Tournament';
import { Vue, Component } from 'vue-property-decorator';
import api from './../../../services/API';

@Component
export default class ScoreTable extends Vue {
  private teamsScores: PointsPerTeam[] = [];
  private filter = '';
  private loading = true;
  private expanded = '';
  private pagination = {
    rowsPerPage: 0,
    sortBy: 'points',
  };
  private columns = [
    {
      name: 'name',
      align: 'left',
      label: 'TEAM',
      field: 'name',
      style:
        'min-width: 170px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;font-size: 15px;',
    },
    {
      name: 'wins',
      align: 'right',
      label: 'WIN',
      field: 'wins',
      style: 'width: 50px; font-size: 15px;',
    },
    {
      name: 'draws',
      align: 'right',
      label: 'DRAW',
      field: 'draws',
      style: 'width: 50px; font-size: 15px;',
    },
    {
      name: 'loses',
      align: 'right',
      label: 'LOSE',
      field: 'loses',
      style: 'width: 50px; font-size: 15px;',
    },
    {
      name: 'points',
      align: 'right',
      label: 'POINTS',
      field: 'points',
      style: 'width: 50px; font-size: 15px;',
      sort: (a: number, b: number) => b - a,
    },
  ];
  private async created() {
    this.teamsScores = await api.tournament.getPointsPerTeam(
      this.$route.params.id
    );
    this.loading = false;
  }
}
</script>
<style lang="scss" scoped>
.q-table__control {
  font-size: 30px !important;
  font-weight: 600;
}
</style>
