<template>
  <div>
        <b-alert show variant="warning"> This is a secure page! </b-alert>
    <b-card class="d-flex m-4 w-50">
      <b-avatar variant="info" :src="$auth.user.picture" class="mr-3"></b-avatar>
      <span class="mr-auto">{{ $auth.user.uesrname }}</span>
      <small>{{ $auth.user.name }}</small>
      <b-badge v-for="a in $auth.user.scape" :key="a">{{ a }}</b-badge>
    </b-card>
    <b-badge>{{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</b-badge>

    <b-badge>{{ $auth.strategy.token.status().expired() }}</b-badge>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: ['auth']
})
</script>

<style scoped>
.container {
  min-height: 70vh;
}
</style>
