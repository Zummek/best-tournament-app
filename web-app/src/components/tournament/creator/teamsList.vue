<template>
  <q-table
    grid
    title="Teams"
    :data="data"
    :columns="columns"
    row-key="name"
    virtual-scroll
    :pagination="pagination"
    :rows-per-page-options="[0]"
  >
    <template v-slot:no-data="{ icon, message }">
      <div class="full-width row flex-center text-accent q-gutter-sm">
        <q-icon size="2em" name="sentiment_dissatisfied" />
        <span> {{ message }} <br />Add some new teams right away! </span>
      </div>
    </template>
    <!-- <template v-slot:top-right>
                <q-btn dense icon="add" color="primary" class="q-pr-xs">
                  Add new team
                </q-btn>
              </template> -->

    <template v-slot:item="props">
      <div class="row q-pa-xs col-12">
        <q-card class="row col-12 items-center">
          <q-card-section class="row col" style="text-align:left">
            <div class="text-grey-14 q-px-xs">
              Name:
            </div>
            <strong>{{ props.row.name }}</strong>
          </q-card-section>
          <q-card-section
            class="col-4 overflow-hidden "
            style="text-align:left"
          >
            <div
              class="row col text-grey-14"
              style="font-size:0.7em"
              v-for="player in props.row.members"
              :key="player.id"
            >
              {{ player.firstName }} {{ player.lastName }}
            </div>
          </q-card-section>
          <q-card-section class="col-1 q-mr-md">
            <q-btn dense icon="remove" @click="deleteTeam(props.row)" />
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IPagination, IColumns} from 'src/components/models';
import { Team } from 'app/../shared/types/Tournament'

@Component
export default class TeamsList extends Vue {
  @Prop({ type: Object, required: true }) readonly pagination!: IPagination;
  @Prop({ type: Array, required: true }) readonly columns!: IColumns;
  @Prop({ type: String, default: () => '' }) readonly expanded!: string;
  @Prop({ type: Array, default: () => [] }) readonly data!: Team[];

  private deleteTeam(team: Team) {
    this.data.splice(this.data.indexOf(team), 1);
  }
}
</script>
