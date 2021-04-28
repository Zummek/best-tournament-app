<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QVueGlobals } from 'quasar'; // it's for quasar types
import AsyncComputedPlugin from 'vue-async-computed';

Vue.use(AsyncComputedPlugin);

moment.locale(process.env.LOCALE);

@Component
export default class App extends Vue {}
</script>
