<template>
  <!-- <q-page class="container row full-width items-center justify-center"> -->
  <q-table
    :data="teamsScores"
    virtual-scroll
    :columns="columns"
    :pagination="pagination"
    row-key="name"
    :filter="filter"
    :rows-per-page-options="[0]"
    hide-bottom
  >
  </q-table>
  <!-- </q-page> -->
</template>
<script lang="ts">
import { PointsPerTeam } from 'app/../shared/types/Tournament';
import { Vue, Component } from 'vue-property-decorator';
import api from './../../../services/API';

@Component
export default class ScoreTable extends Vue {
  private teamsScores: PointsPerTeam[] = [];
  private filter = '';
  private expanded = '';
  private pagination = {
    rowsPerPage: 0,
    sortBy: 'points',
  };
  private columns = [
    // {
    //   name: 'position',
    //   required: true,
    //   label: 'POS',
    //   align: 'left',
    //   field: 'position',
    //   sortable: true,
    //   style: 'width: 50px; font-size: 15px;',
    // },
    {
      name: 'name',
      align: 'left',
      label: 'TEAM',
      field: 'name',
      style:
        'max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;font-size: 15px;',
    },
    {
      name: 'wins',
      align: 'right',
      label: 'WIN',
      field: 'wins',
      style: 'min-width: 70px; font-size: 15px;',
    },
    {
      name: 'draws',
      align: 'right',
      label: 'DRAW',
      field: 'draws',
      style: 'min-width: 70px; font-size: 15px;',
    },
    {
      name: 'loses',
      align: 'right',
      label: 'LOSE',
      field: 'loses',
      style: 'min-width: 70px; font-size: 15px;',
    },
    {
      name: 'points',
      align: 'right',
      label: 'POINTS',
      field: 'points',
      style: 'min-width: 70px; font-size: 15px;',
      sort: (a: number, b: number) => b - a,
      sortable: false,
    },
  ];
  private data = [
    {
      position: '1',
      team: 'Fnatic',
      win: '3',
      draw: '1',
      lose: '0',
      points: '10',
    },
    {
      position: '2',
      team: 'Virtus Proooooooooooooooooooo',
      win: '2',
      draw: '2',
      lose: '0',
      points: '8',
    },
    {
      position: '3',
      team: 'Leeds',
      win: '1',
      draw: '1',
      lose: '2',
      points: '4',
    },
    {
      position: '4',
      team: 'Arsenal',
      win: '1',
      draw: '1',
      lose: '2',
      points: '4',
    },
    {
      position: '5',
      team: 'South',
      win: '0',
      draw: '4',
      lose: '0',
      points: '4',
    },
    {
      position: '6',
      team: 'Everton',
      win: '0',
      draw: '2',
      lose: '2',
      points: '2',
    },
  ];

  private async created() {
    this.teamsScores = await api.tournament.getPointsPerTeam(
      this.$route.params.id
    );
    console.log(this.teamsScores);
  }
}
</script>
<style lang="scss" scoped>
.q-table__control {
  font-size: 30px !important;
  font-weight: 600;
}
// .container {
//   background: linear-gradient(30deg, #572403, #2d1114, #090317);
//   font-size: 40px;
// }
// .q-table__container {
//   background-color: rgba(0, 0, 0, 0);
//   font-weight: 700;
// }
</style>
