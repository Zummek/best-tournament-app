<template>
  <q-page class="flex flex-center">
    <div class="row full-width justify-center">
      <q-card class="col-sm-6 col-md-4 col-lg-3">
        <q-card-section class="row justify-center">
          <div class="col-9 text-center">
            <q-icon name="emoji_events" size="4.4em" />
            <div class="text-h6">
              Welcome to <br />
              best tournament application!
            </div>
            <div class="text-subtitle2" style="margin-top: 20px">
              Sign in via Microsoft Office account and enjoy company fun
            </div>
          </div>
        </q-card-section>
        <q-card-section class="row justify-center">
          <q-btn
            color="primary"
            icon="mail"
            label="Login with Microsoft"
            @click="loginWithMS"
          />
        </q-card-section>
        <q-card-section class="row justify-center authors text-weight-light">
          Authors: <br />
          Adam Jędryka, Przemysław Rychter <br />
          Kuba Pawleniak, Kamil Zaborowski
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  loginWithMS() {
    console.log('login');
  }
}
</script>

<style lang="scss" scoped>
.authors {
  color: gray;
}
</style>
