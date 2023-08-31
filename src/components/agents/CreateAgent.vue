<template>
  <div class="o-modal">
    <h4>Create new Agent</h4>
    <div>
      <div class="alert alert-danger" v-if="serverError">{{serverError}}</div>
      <form @submit.prevent="signUpNewAgent()">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name"/>
          <div class="text-danger" v-if="errors.name">{{errors.name}}</div>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model="email"/>
          <div class="text-danger" v-if="errors.email">{{errors.email}}</div>
        </div>
        <div class="form-group">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{authority || 'Select authority'}}
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" @click="useAuthority('ORGANIZATION_ADMIN')">ORGANIZATION_ADMIN</a></li>
            <li><a class="dropdown-item" href="#" @click="useAuthority('DEPARTMENT_ADMIN')">DEPARTMENT_ADMIN</a></li>
            <li><a class="dropdown-item" href="#" @click="useAuthority('DEPARTMENT_USER')">DEPARTMENT_USER</a></li>
          </ul>
          <div class="text-danger" v-if="errors.authority">{{errors.authority}}</div>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
        <button class="btn btn-secondary" v-on:click="closeThis">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";
import {ALL_AGENTS} from "@/backendurls";
import {post} from "@/services/axiosAuthorized";

export default {

  data() {
    return {
      name: '',
      email: '',
      authority: '',
      errors: [],
      serverError: ''
    }
  },

  methods: {
    useAuthority(authority) {
      this.authority = authority;
    },

    closeThis() {
      this.$emit('closeCreateAgent');
    },

    signUpNewAgent() {
      this.errors = [];

      if (!this.name) {
        this.errors['name'] = 'Name could not be empty'
      }

      if (!this.email) {
        this.errors['email'] = 'Email could not be empty'
      }

      if (!this.authority) {
        this.errors['authority'] = 'Authority could not be empty'
      }

      if (Object.keys(this.errors).length !== 0) {
        return;
      }

      post(ALL_AGENTS, {
        name: this.name,
        email: this.email,
        authority: this.authority
      })

      this.$emit('closeAndUpdateCreateAgent');
    }
  },

  computed: {
    ...mapGetters('auth', {
      token: USER_ACCESS_TOKEN_GETTER,
    })
  },
}
</script>

<style scoped>
.o-modal {
  position: fixed;
  background: #fff;
  border: 1px solid #a1a1a1;
  box-shadow: 1px 1px 1px #000;
  width: 40%;
  top: 20%;
  margin-left: 30%;
  padding: 20px;
}
</style>