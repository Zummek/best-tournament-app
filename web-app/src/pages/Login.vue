<template>
  <q-page class="pageStyle flex flex-center">
    <div class="row full-width justify-center">
      <q-card-section
        horizontal
        align="around"
        class="loginSection col-8 justify-center"
      >
        <q-card class="mobile-hide col-md-4">
          <q-img src="https://placeimg.com/500/300/nature" height="100%" />
        </q-card>
        <q-card-section class="col-8">
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
        </q-card-section>
      </q-card-section>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';

@Component
export default class Login extends Vue {
  private async loginWithMS() {
    const authUrlResponse: AxiosResponse = await axios({
      method: 'POST',
      url: 'http://localhost:3000/v1/users/login',
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    window.location = authUrlResponse.data.data as Location;
  }
  private async mounted() {
    if (this.$route.query.code) {
      axios.defaults.withCredentials = true;

      await axios({
        method: 'POST',
        url: 'http://localhost:3000/v1/users/logged',
        data: {
          code: this.$route.query.code,
        },
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.authors {
  color: gray;
}
.loginSection {
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.pageStyle {
  background-color: #ede7e7;
  background-image: linear-gradient(19deg, #ede7e7 0%, #e7e2f7 100%);
}
</style>
