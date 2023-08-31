<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Set password for agent</h3>
          <hr />
        </div>
        <form @submit.prevent="setPassword()">
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password"/>
            <div class="text-danger" v-if="errors.password">{{errors.password}}</div>
          </div>

          <div class="my-3">
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {post} from "@/services/axiosAuthorized";
import {SIGNUP_URL} from "@/backendurls";

export default {
  data() {
    return {
      errors: [],
      password: ''
    }
  },

  methods: {
    setPassword() {
      this.errors = [];

      if (!this.password || this.password.length < 6) {
        this.errors['password'] = 'Password could not be empty and has more than 5 symbols';
      }

      let agentId = window.location.pathname.split("/").pop();
      // test
      post(SIGNUP_URL + '/' + agentId, {password: this.password});

      // TODO: if user not logged in - save token to store
      this.$router.push('/');
    }
  }
}
</script>