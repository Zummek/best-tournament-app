<template>
  <div class="full-width row flex-center text-accent q-gutter-sm">
    <q-icon size="2em" name="sentiment_dissatisfied" /><br />
    {{ $t('tournament.list.error.noTournaments') }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class EmptyTournamentList extends Vue {}
</script>
