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
      hide-header
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
        <div class="q-pa-xs col-12 ">
          <q-card class="row justify-between">
            <q-card-section
              class="col-6 overflow-hidden"
              style="text-align:left"
            >
              <div class="text-grey-14">
                Name:
              </div>
              <strong>{{ props.row.name }}</strong>
            </q-card-section>
            <q-card-section class="col-6" style="text-align:right">
              {{ props.row.status }}
            </q-card-section>
            <q-separator vertical class="q-mx-xs" />
            <q-card-section class="col-12">
              <div class="text-grey-14 ">
                Participants:
              </div>
              <q-chip>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                JA
              </q-chip>
              <q-avatar
                v-for="n in 15"
                :key="n"
                icon="img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
              >
              </q-avatar>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TournamentsList extends Vue {
  private filter = '';
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
      name: 'Ala ma kota i kocha tego kota i wgl go uwielbia',
      status: 'in progresss..',
      participants: 'You and I',
    },
    {
      name: 'Tourn2',
      status: 'Finished.',
      participants: 'You and I',
    },
  ];
}
</script>
<style></style>
