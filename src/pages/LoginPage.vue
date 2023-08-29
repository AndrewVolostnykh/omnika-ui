<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div>
          <div>
            <h3>Login</h3>
            <hr />
          </div>
          <div class="alert alert-danger" v-if="serverError">{{serverError}}</div>
          <form @submit.prevent="onLogin()">
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" v-model="email"/>
              <div class="text-danger" v-if="errors.email">{{errors.email}}</div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model="password"/>
              <div class="text-danger" v-if="errors.password">{{errors.password}}</div>
            </div>

            <div class="my-3">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import LoginValidations from "@/services/LoginValidations";
import {mapActions} from "vuex";
import {LOGIN_ACTION} from "@/store/storeConstants";

export default {
  // computed: {
  //   ...mapState('auth', {
  //     name: state => state.name
  //   })
  // },
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      serverError: '' // gonna be an array
    }
  },
  methods: {
    ...mapActions('auth', {
      login: LOGIN_ACTION
    }),
    onLogin() {
      this.serverError = '';
      this.errors = new LoginValidations(this.email, this.password).checkOnLogin();

      if (!this.errors['email'] && !this.errors['password']) {
        this.login({email: this.email, password: this.password})
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          this.serverError = error.data.code
        });
      }
    }
  }
};
</script>