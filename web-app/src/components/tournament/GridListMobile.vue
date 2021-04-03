<template>
  <div class="q-pa-md lt-sm">
    <q-table
      grid
      title="Tournaments"
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      virtual-scroll
      :pagination="pagination"
      :rows-per-page-options="[0]"
      :expanded.sync="expanded"
    >
      <template v-slot:top-right>
        <q-input
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          style="width:150px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="row q-pa-xs col-12">
          <q-btn
            :to="{ name: 'TournamentDetails', params: { id: props.row.id } }"
            no-caps
            flat
            padding="none"
            class="col-12"
          >
            <q-card class="row col-12">
              <q-card-section
                class="col-6 overflow-hidden"
                style="text-align:left"
              >
                <div class="text-grey-14">
                  Name:
                </div>
                <strong>{{ props.row.name }}</strong>
              </q-card-section>
              <q-card-section
                class="col-6"
                style="text-align:right"
                :style="
                  props.row.status === 'In progress'
                    ? 'color: orange'
                    : 'color: green'
                "
              >
                {{ props.row.status }}
              </q-card-section>
            </q-card>
          </q-btn>
        </div>
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IPagination, IData, IColumns } from '../models';

@Component
export default class GridListMobile extends Vue {
  @Prop({ type: String, default: () => '' }) filter!: string;
  @Prop({ type: String, default: () => '' }) readonly expanded!: string;
  @Prop({ type: Array, required: true }) readonly columns!: IColumns;
  @Prop({ type: Array, default: () => [] }) readonly data!: IData[];
  @Prop({ type: Object, required: true }) readonly pagination!: IPagination;
}
</script>
