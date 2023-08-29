<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Signup</h3>
          <hr />
        </div>
        <form @submit.prevent="onSignUp()">
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model="email"/>
            <div class="text-danger" v-if="errors.email">{{errors.email}}</div>
          </div>
          <div class="form-group">
            <label>Organization Name</label>
            <input type="text" class="form-control" v-model="organizationName"/>
            <div class="text-danger" v-if="errors.organizationName">{{errors.organizationName}}</div>
          </div>
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
import SignupValidations from "@/services/SignupValidations";
import {mapActions} from 'vuex';
import {SIGNUP_ACTION} from "@/store/storeConstants";

export default {
  data() {
    return {
      email: '',
      password: '',
      organizationName: '',
      errors: []
    }
  },
  methods: {
    ...mapActions('auth', {
      signup: SIGNUP_ACTION
    }),
    onSignUp() {
      this.errors = new SignupValidations(this.email, this.password, this.organizationName).checkValidations();

      // TBD: make more flexible check
      if (!this.errors['password'] && !this.errors['email'] && !this.errors['organizationName']) {
        this.signup({email: this.email, password: this.password, organizationName: this.organizationName})
      }
    }
  }
};
</script>