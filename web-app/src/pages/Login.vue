<template>
  <q-page class="container flex flex-center">
    <div class="row full-width justify-center">
      <q-card class="col-sm-9 col-md-7 col-xl-5">
        <q-card-section horizontal>
          <img
            v-if="$q.screen.gt.md"
            class="image__logo"
            style="flex: 2; max-width: 100%; height: auto;"
            :src="logoUrl"
          />
          <q-separator inset size="0.13em" vertical />

          <q-card-section style="flex: 3">
            <q-card-section class="row justify-center">
              <div class="text-center">
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
                color="accent"
                icon="mail"
                label="Login with Microsoft"
                @click="loginWithMS"
              />
            </q-card-section>
            <q-card-section
              class="row justify-center authors text-weight-light"
            >
              Authors: <br />
              Adam Jędryka, Przemysław Rychter <br />
              Kuba Pawleniak, Kamil Zaborowski
            </q-card-section>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import api from 'src/services/http';
import { Vue, Component } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';

@Component
export default class Login extends Vue {
  private logoUrl: unknown = '';

  private async loginWithMS() {
    const authUrlResponse: AxiosResponse = await axios({
      method: 'POST',
      url: 'http://localhost:3000/v1/users/login',
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    window.location = authUrlResponse.data.data as Location;
  }
  private async mounted() {
    const logoResponse = await axios({
      method: 'GET',
      url: 'http://localhost:3000/v1/users/logo',
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.logoUrl = logoResponse.data.logo;

    if (this.$route.query.code) {
      axios.defaults.withCredentials = true;
      await axios({
        method: 'POST',
        url: 'http://localhost:3000/v1/users/logged',
        data: {
          code: this.$route.query.code,
        },
      });
      // private async mounted() {
      //   if (this.$route.query.code) {
      //     await api.internalApi.auth.getToken(String(this.$route.query.code));
      //   }
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.authors {
  color: gray;
}

.container {
  background: linear-gradient($orange-1, $orange-2, $accent);
  // background: linear-gradient(19deg, #ede7e7 0%, #e7e2f7 100%);
}
</style>
