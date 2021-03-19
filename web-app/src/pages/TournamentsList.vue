<template>
  <!-- mobile version -->
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
          <q-btn no-caps flat padding="none" class="col-12">
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
              <!-- <q-separator vertical class="q-mx-xs" />
              <q-card-section class="col-12">
                <div class="text-grey-14 " style="text-align:left">
                  Participants:
                </div>
                
                <q-chip size="1em">
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                  Organizer
                </q-chip>
                <q-avatar size="2em" v-for="n in 10" :key="n" class="q-ml-xs">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-card-section> -->
            </q-card>
          </q-btn>
        </div>
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[36, 18]">
      <q-btn round color="primary" icon="add" />
    </q-page-sticky>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
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
      name: 'Work',
      status: 'In progress',
      participants: 'You and I',
    },
    {
      name: 'Tourn2',
      status: 'Finished',
      participants: 'You and I',
    },
    {
      name: 'Tourn3',
      status: 'Finished',
      participants: 'No one',
    },
    {
      name: 'Tourn4',
      status: 'Finished',
      participants: 'No one',
    },
    {
      name: 'Tourn5',
      status: 'Finished',
      participants: 'No one',
    },
    {
      name: 'Tourn6',
      status: 'Finished',
      participants: 'No one',
    },
  ];
}
</script>
<style></style>
