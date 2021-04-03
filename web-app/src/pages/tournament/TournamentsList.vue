<template>
  <div>
    <grid-list-mobile
      :data="data"
      :columns="columns"
      :filter="filter"
      :expanded="expanded"
      :pagination="pagination"
    />
    <grid-list-desktop
      :data="data"
      :columns="columns"
      :filter="filter"
      :expanded="expanded"
      :pagination="pagination"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import GridListMobile from '../../components/tournament/GridListMobile.vue';
import GridListDesktop from '../../components/tournament/GridListDesktop.vue';
@Component({
  components: { GridListMobile, GridListDesktop },
})
export default class TournamentsList extends Vue {
  private filter = '';
  private expanded = '';
  private pagination = {
    rowsPerPage: 0,
  };
  private columns = [
    {
      name: 'desc',
      required: true,
      label: 'Tournament name',
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'status',
      align: 'right',
      label: 'Status',
      field: 'status',
      sortable: true,
    },
    {
      name: 'participants',
      align: 'right',
      label: 'Participants',
      field: 'participants',
    },
  ];
  private data = [
    {
      id: '1',
      name: 'Work',
      status: 'In progress',
      participants: 'You and I',
    },
    {
      id: '2',
      name: 'Tourn2',
      status: 'Finished',
      participants: 'You and I',
    },
    {
      id: '3',
      name: 'Tourn3',
      status: 'Finished',
      participants: 'No one',
    },
    {
      id: '4',
      name: 'Tourn4',
      status: 'Finished',
      participants: 'No one',
    },
    {
      id: '5',
      name: 'Tourn5',
      status: 'Finished',
      participants: 'No one',
    },
    {
      id: '6',
      name: 'Tourn6',
      status: 'Finished',
      participants: 'No one',
    },
  ];
}
</script>
