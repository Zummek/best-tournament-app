<template>
  <div class="q-pa-md lt-sm">
    <q-table
      grid
      :title="$t('tournament.list.label')"
      :data="tournaments"
      :columns="columns"
      row-key="id"
      :filter.sync="queryLocal"
      virtual-scroll
      :pagination.sync="paginationLocal"
      @request="updateProps"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <search-bar :query.sync="queryLocal" isMobile />
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
import { Vue, Component, Prop, PropSync, Watch } from 'vue-property-decorator';
import SearchBar from './../../SearchBar.vue';
import TournamentItemMobile from './TournamentItemMobile.vue';
import { IPagination, IListProps } from './../../models';
@Component({
  components: {
    SearchBar,
    TournamentItemMobile,
  },
})
export default class TournamentListMobile extends Vue {
  @PropSync('query', { type: String, default: '' }) queryLocal!: string;
  @Prop({ type: Array, required: true }) readonly columns!: QTable['columns'];
  @Prop({ type: Array, default: () => [] }) readonly tournaments!: Tournament[];
  @PropSync('pagination', { type: Object, required: true })
  paginationLocal!: IPagination;

  //   @Watch('queryLocal')
  //   private display() {
  //     console.log(this.queryLocal);
  //   }

  private updateProps(props: IListProps) {
    const { page, rowsNumber } = props.pagination;
    // console.log(props);
    this.paginationLocal.page = page;
    this.paginationLocal.rowsNumber = rowsNumber;

    //trzeba dopiąć pobieranie nowych danych z serwera w zależności od filtra
    // this.queryLocal = props.filter;
    // this.$emit('update:query', this.queryLocal);
    this.$emit('update:pagination', this.paginationLocal);
  }
}
</script>
