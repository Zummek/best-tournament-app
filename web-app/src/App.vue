<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QVueGlobals } from 'quasar' // it's for quasar types

@Component
export default class App extends Vue {}
</script>
