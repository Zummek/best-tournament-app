<template>
  <q-btn-dropdown flat icon="language" :label="currentLangLabel">
    <q-list>
      <q-item
        clickable
        v-close-popup
        @click="changeLang(lang.key)"
        v-for="lang in langs"
        :key="lang.key"
      >
        <q-item-section>
          <q-item-label>{{ lang.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import moment from 'moment';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class UserAvatar extends Vue {
  private langs = [
    {
      label: 'Polski',
      key: 'pl',
    },
    {
      label: 'English',
      key: 'en',
    },
  ];

  private get currentLangLabel() {
    return this.langs.find(lang => lang.key === this.$i18n.locale)?.label;
  }

  private changeLang(key: string) {
    moment.locale(key);
    this.$i18n.locale = key;
    localStorage.setItem('lang', key);
  }
}
</script>
