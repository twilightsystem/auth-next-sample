<template>
  <div>
        <b-navbar toggleable="md" variant="light">
      <b-navbar-toggle target="nav_collapse" />
      <b-navbar-brand to="/"> auth-next sample</b-navbar-brand>

      <b-collapse id="nav_collapse" is-nav class="w-100">
        <b-navbar-nav>
          <b-nav-item to="/"> Index </b-nav-item>
          <b-nav-item to="/public"> Public </b-nav-item>
          <b-nav-item to="/secure"> Secure </b-nav-item>
          <b-nav-item to="/home" exact> Home </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="$auth.$state.loggedIn">
            <b-nav-item-dropdown :text="$auth.user.name" right>
              <b-dropdown-item @click="$auth.logout()">
                Logout
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-img
              :src="$auth.user.picture"
              class="mt-1"
              rounded="circle"
              width="30px"
              height="30px"
            />
          </template>
          <template v-else>
            <b-dropdown-item to="/login"> Login </b-dropdown-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
  </div>
</template>