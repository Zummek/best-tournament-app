<template>
  <div class="gt-xs row full-width justify-center">
    <div class="q-pa-md col-10 ">
      <q-table
        grid
        :data="data"
        :columns="columns"
        row-key="id"
        :filter="filter"
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
          <q-input
            dense
            debounce="300"
            v-model="filter"
            :placeholder="$t('tournament.list.search')"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:no-data>
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" /><br />
            {{ $t('tournament.list.error.noTournaments') }}
          </div>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-sm col-sm-12 col-md-6 col-lg-4">
            <q-btn
              :to="{ name: 'TournamentDetails', params: { id: props.row.id } }"
              no-caps
              flat
              padding="none"
              class="col-12"
            >
              <q-card class="flex row">
                <q-card-section class="col-4 overflow-hidden card__logo">
                  <q-icon size="5em" name="emoji_events" />
                </q-card-section>

                <q-card-section class="col-8 overflow-hidden">
                  <div class="row justify-between items-center">
                    <h3 class="card__header">{{ props.row.name }}</h3>
                    <q-badge
                      align="middle"
                      outline
                      rounded
                      :color="
                        props.row.status ===
                        $t('tournament.status.inProgress')
                          ? 'orange'
                          : 'green'
                      "
                      style="height: 35px;"
                      :label="props.row.status"
                    />
                  </div>

                  <div class="text-grey-14 " style="text-align:left">
                    {{ $t('tournament.list.participants') }}:
                  </div>
                  <q-chip size="1em">
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                    {{ $t('tournament.organizer') }}
                  </q-chip>
                  <q-avatar size="2em" v-for="n in 10" :key="n" class="q-ml-xs">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-card-section>
              </q-card>
            </q-btn>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { IPagination, TournamentListData, IColumns, IProps } from '../models';

@Component
export default class GridListDesktop extends Vue {
  @Prop({ type: String, default: () => '' }) filter!: string;
  @Prop({ type: Array, required: true }) readonly columns!: IColumns[];
  @Prop({ type: Array, default: () => [] })
  readonly data!: TournamentListData[];
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
