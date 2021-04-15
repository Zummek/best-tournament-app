<template>
  <div>
    <grid-list-mobile
      :data="data"
      :columns="columns"
      :filter="filter"
      :expanded="expanded"
      :pagination="pagination"
      :pageChanged="loadData"
    />
    <grid-list-desktop
      :data="data"
      :columns="columns"
      :filter="filter"
      :expanded="expanded"
      :pagination="pagination"
      :pageChanged="loadData"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import GridListMobile from '../../components/tournament/GridListMobile.vue';
import GridListDesktop from '../../components/tournament/GridListDesktop.vue';
import { Team } from '../../../../shared/types/Tournament';
import User from '../../../../shared/types/User';
import api from './../../services/API/index';
import { TournamentListData } from './types';
@Component({
  components: { GridListMobile, GridListDesktop },
})
export default class TournamentsList extends Vue {
  private trueData: TournamentListData[] | null = null;
  private filter = '';
  private expanded = '';
  private pagination = {
    page: 1,
    rowsPerPage: 1,
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

  private async loadData(page: number) {
    // const mapUsers = (teams: Team[]) => {
    //   return teams.map((team: Team) => {
    //     return team.members.map((user: User) => ({
    //       firstName: user.firstName,
    //       lastName: user.lastName,
    //     }));
    //   });
    // };
    const tournaments = await api.tournament.getAllTournaments(page, 20);
    this.trueData = tournaments.map((el, index) => {
      return {
        id: el.id as string,
        name: el.name,
        status: el.isFinished === true ? 'Finished' : 'In progress',
        participants: el.teams[index].members,
      };
    });
  }
}
</script>
