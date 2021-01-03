<template>
  <div>
    <h2 class="text-center">Login</h2>
    <hr />
    <b-alert v-if="errorMessage" show variant="danger">
      {{ errorMessage }}
    </b-alert>
    <b-row align-h="center" class="pt-4">
      <b-col md="4">
        <b-card bg-variant="light">
          <busy-overlay />
          <form @keydown.enter="login">
            <b-form-group label="Username">
              <b-input
                ref="username"
                v-model="username"
                placeholder="anything"
              />
            </b-form-group>

            <b-form-group label="Password">
              <b-input v-model="password" type="password" placeholder="123" />
            </b-form-group>

            <div class="text-center">
              <b-btn variant="primary" block @click="login"> Login </b-btn>
              <b-btn variant="secondary" block @click="localRefresh">
                Login with Refresh
              </b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { HTTPResponse } from "@nuxtjs/auth-next"

export default Vue.extend({
  middleware: ['auth'],
  data(): {
    username: string,
    password: string,
    error: string | Error,
  } {
    return {
      username: '',
      password: '123',
      error: '',
    }
  },
  computed: {
    redirect(): string | (string | null)[]  {
      return (
        this.$route.query.redirect
      )
    },
    isCallback(): Boolean {
      return Boolean(this.$route.query.callback)
    },
    errorMessage(): string | null {
      const { error } = this
      if (!error || typeof error === 'string') {
        return error
      }

      if (error.message) {
        return error.message
      }

      return 'error is undefined'
    }
  },
  methods: {
    login(): Promise<void | HTTPResponse> {
      this.error = ''

      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
          this.error = err.response?.data.error
        })
    },

    localRefresh(): Promise<void | HTTPResponse> {
      this.error = ''

      return this.$auth
        .loginWith('localRefresh', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
          this.error = err.response?.data.error
        })
    },
  }
})
</script>

<style scoped>
.login-button {
  border: 0;
}
</style>
