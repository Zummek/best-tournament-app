<template>
  <div class="gt-xs row full-width justify-center">
    <div class="q-pa-md col-10 ">
      <q-table
        grid
        :data="tournaments"
        :columns="columns"
        row-key="id"
        :filter="query"
        virtual-scroll
        :pagination.sync="childPagination"
        :rows-per-page-options="[0]"
        @request="loadNewPage"
      >
        <template v-slot:top-left>
          <div class="row">
            <span class="title">{{ $t('tournament.list.label') }}</span>
            <q-btn
              :to="{ name: 'TournamentCreator' }"
              push
              color="primary"
              :label="$t('tournament.list.addNewBtn')"
            />
          </div>
        </template>
        <template v-slot:top-right>
          <search-bar v-model="query">
        </template>

        <template v-slot:no-data>
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" /><br />
            {{ $t('tournament.list.error.noTournaments') }}
          </div>
        </template>

        <template v-slot:item="props">
          <tournament-item-desktop :tournament="props.row" />
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import Tournament from 'app/../shared/types/Tournament';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { IPagination, TournamentListData, IColumns, IProps } from '../../models';

@Component
export default class GridListDesktop extends Vue {
  @Prop({ type: String, default: () => '' }) query!: string;
  @Prop({ type: Array, required: true }) readonly columns!: IColumns[];
  @Prop({ type: Array, default: () => [] }) readonly tournaments!: Tournament[];
  @Prop({ type: Object, required: true }) pagination!: IPagination;

  private childPagination: IPagination = { ...this.pagination };

  @Watch('pagination.rowsNumber')
  private loadRowsNumber() {
    this.childPagination.rowsNumber = this.pagination.rowsNumber;
  }

  @Watch('pagination.page')
  private loadPage() {
    this.childPagination.page = this.pagination.page;
  }

  private loadNewPage(props: IProps) {
    const { page, rowsNumber } = props.pagination;
    this.childPagination.page = page;
    this.childPagination.rowsNumber = rowsNumber;
    this.$emit('update:pagination', this.childPagination);
  }
}
</script>
<style lang="scss" scoped>
.card__logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card__header {
  font-size: 30px;
  font-weight: 400;
  padding: 0;
  margin: 0;
  text-align: center;
}
.title {
  font-size: 20px;
  letter-spacing: 0.005 em;
  font-weight: 400;
  padding-right: 10px;
}
</style>
