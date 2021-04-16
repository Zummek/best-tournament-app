<template>
  <div>
    <grid-list-mobile
      :data="trueData"
      :columns="columns"
      :filter="filter"
      :pagination.sync="pagination"
    />
    <grid-list-desktop
      :data="trueData"
      :columns="columns"
      :filter="filter"
      :pagination.sync="pagination"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import GridListMobile from '../../components/tournament/GridListMobile.vue';
import GridListDesktop from '../../components/tournament/GridListDesktop.vue';
import { Team } from '../../../../shared/types/Tournament';
import { IPagination } from './../../components/models';
import User from '../../../../shared/types/User';
import api from './../../services/API/index';
import { TournamentListData, ListUser } from './types';
@Component({
  components: { GridListMobile, GridListDesktop },
})
export default class TournamentsList extends Vue {
  private trueData: TournamentListData[] = [];
  private filter = '';
  private pagination: IPagination = {
    page: 1,
    rowsPerPage: 1,
    rowsNumber: 0,
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
  ];

  @Watch('pagination.page')
  private async pageChanged() {
    await this.loadData(this.pagination.page);
  }
  private async loadData(page: number) {
    //Funkcja wyciąga wszystkich uczestników danego turnieju.
    const mapUsers = (teams: Team[]) => {
      //1 etap - wynik: np. [[{firstName: "Artur", lastName: "Oswald"},{firstName: "Chris", lastName: "Green"}],[...]]
      const mappedUsers = teams.map((team: Team) => {
        return team.members.map((user: User) => ({
          firstName: user.firstName,
          lastName: user.lastName,
        }));
      });
      //2 etap -> tworzenie jednej tablicy
      const cleanUsers: ListUser[] = [];
      mappedUsers.forEach(team => {
        cleanUsers.push(...team);
      });
      return cleanUsers;
    };

    const tournamentsResponse = await api.tournament.getAllTournaments(page, 1);
    this.pagination.rowsNumber = tournamentsResponse.totalRows;
    this.trueData = tournamentsResponse.tournaments.map((el, index) => {
      const cleanUsers = mapUsers(tournamentsResponse.tournaments[index].teams);
      return {
        id: el.id as string,
        name: el.name,
        status: el.isFinished === true ? 'Finished' : 'In progress',
        participants: cleanUsers,
      };
    });
    console.log(this.trueData);
  }

  private async created() {
    await this.loadData(1);
  }
}
</script>
