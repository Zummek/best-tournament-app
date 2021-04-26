<template>
  <div class="row col-4 justify-center" @click="updateTournamentType">
    <q-icon class="col-12" :name="iconName" style="font-size:10em" />
    {{tournamentTypeName}}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SelectableTournamentType extends Vue {
  @Prop({ type: String, required: true })
  readonly tournamentTypeName!: string;
  @Prop({ type: String, required: true })
  readonly iconName!: string;

    private updateTournamentType(){
        this.$emit('updateTournamentType',this.tournamentTypeName)
    }

}

</script>

<style></style>
