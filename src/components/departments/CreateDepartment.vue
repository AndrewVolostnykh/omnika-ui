<template>
  <div class="o-modal">
    <h4>Create new department</h4>
    <div>
      <div class="alert alert-danger" v-if="serverError">{{serverError}}</div>
      <form @submit.prevent="createDepartment()">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name"/>
          <div class="text-danger" v-if="errors.name">{{errors.name}}</div>
        </div>

<!--        ADD ADMIN AGENT AGENTS-->
<!--        ADD CHANNELS-->

<!--        <div class="my-3">-->
<!--          <button type="submit" class="btn btn-primary">Login</button>-->
<!--        </div>-->
        <button type="submit" class="btn btn-primary">Save</button>
        <button class="btn btn-secondary" v-on:click="closeThis">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ALL_DEPARTMENTS} from "@/backendurls";
import {mapGetters} from "vuex";
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";

export default {
  data() {
    return {
      name: '',
      serverError: '',
      errors: []
    }
  },

  computed: {
    ...mapGetters('auth', {
      token: USER_ACCESS_TOKEN_GETTER,
    })
  },
  methods: {
    closeThis() {
      this.$emit('closeIt');
    },
    createDepartment() {
      this.errors = [];

      if (!this.name) {
        this.errors['name'] = 'Name could not be empty'
        return;
      }

      axios({
        method: 'post',
        url: ALL_DEPARTMENTS,
        data: {
          name: this.name
        },
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }).then(() => {
        this.$emit('closeItAndUpdate');
      }).catch(error => {
        this.serverError = error.response.data.code;
      })
    }
  },
};
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