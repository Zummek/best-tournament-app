<template>
  <q-page class="container row full-width items-center justify-center">
    <div class="q-pa-md col-8">
      <q-table
        dark
        table-style="background: rgba(0,0,0,0);"
        title="Standings"
        :data="data"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-bottom
      >
      </q-table>
    </div>
  </q-page>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TournamentStandings extends Vue {
  private filter = '';
  private expanded = '';
  private pagination = {
    rowsPerPage: 0,
  };
  private columns = [
    {
      name: 'position',
      required: true,
      label: 'POS',
      align: 'left',
      field: 'position',
      sortable: true,
      style: 'width: 5px; font-size: 20px;',
    },
    {
      name: 'team',
      align: 'left',
      label: 'TEAM',
      field: 'team',
      sortable: true,
      style: 'font-size: 20px;',
    },
    {
      name: 'win',
      align: 'right',
      label: 'WIN',
      field: 'win',
      style: 'width: 5px; font-size: 20px;',
    },
    {
      name: 'draw',
      align: 'right',
      label: 'DRAW',
      field: 'draw',
      style: 'width: 5px; font-size: 20px;',
    },
    {
      name: 'lose',
      align: 'right',
      label: 'LOSE',
      field: 'lose',
      style: 'width: 5px; font-size: 20px;',
    },
    {
      name: 'points',
      align: 'right',
      label: 'POINTS',
      field: 'points',
      style: 'width: 5px; font-size: 20px;',
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
      team: 'Virtus Pro',
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
}
</script>
<style lang="scss" scoped>
.q-table__control {
  font-size: 30px !important;
  font-weight: 600;
}
.container {
  background: linear-gradient(30deg, #572403, #2d1114, #090317);
  font-size: 40px;
}
.q-table__container {
  background-color: rgba(0, 0, 0, 0);
  font-weight: 700;
}
</style>
