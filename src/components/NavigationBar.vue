<template>
  <div class="left-side-div">
    <ul class="nav nav-pills left-pressed">
      <li class="nav-item" v-on:click="this.$router.push('/')">
        <a class="nav-link" v-bind:class="(this.active==='HOME') && 'active'" href="#">Home</a>
      </li>
      <li class="nav-item" v-on:click="this.$router.push('/channels')">
        <a class="nav-link" v-bind:class="(this.active==='CHANNELS') && 'active'" href="#">Channels</a>
      </li>
      <li class="nav-item" v-on:click="this.$router.push('/departments')">
        <a class="nav-link" v-bind:class="(this.active==='DEPARTMENTS') && 'active'" href="#">Departments</a>
      </li>
      <li class="nav-item" v-on:click="this.$router.push('/agents')">
        <a class="nav-link" v-bind:class="(this.active==='AGENTS') && 'active'" href="#">Agents</a>
      </li>
      <li class="nav-item disabled">
        <a class="nav-link disabled" href="#">Configurations</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="onLogout()">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {LOGOUT_ACTION} from "@/store/storeConstants";

export default {
  props: ['active'],

  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION
    }),

    bindActiveClass(tabName) {
      return this.active === tabName && 'active';
    },

    onLogout() {
      this.logout();
      this.$router.replace('/login');
    }
  }
};
</script>

<style scoped>
.left-pressed {
  margin: 1%;
  padding: 0;
  width: 100%;
}
</style>