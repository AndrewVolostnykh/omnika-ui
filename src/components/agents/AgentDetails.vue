<template>
  <div class="o-modal">
    <h4>Agent [{{this.name}}]</h4>
    <div>
      <div class="alert alert-danger" v-if="serverError">{{serverError}}</div>
      <form @submit.prevent="updateAgent()">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name"/>
          <div class="text-danger" v-if="errors.name">{{errors.name}}</div>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model="email"/>
          <div class="text-danger" v-if="errors.name">{{errors.email}}</div>
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
        <button type="submit" class="btn btn-primary">Update</button>
        <button class="btn btn-secondary" v-on:click="closeThis">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";
import {get, put} from "@/services/axiosAuthorized"
import {ALL_AGENTS} from "@/backendurls";

export default {
  props: ['agentId'],

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
    closeThis() {
      this.$emit('closeAgentDetails');
    },

    updateAgent() {
      put(
          ALL_AGENTS + '/' + this.agentId,
          {name: this.name, email: this.email, authority: this.authority}
      ).catch(error => {
        this.serverError = error.response.data.code;
      }).then(() => {
        this.$emit("closeDetailsWithUpdate");
      })
    },

    useAuthority(newAuthority) {
      this.authority = newAuthority;
    },

    getAgentDetails() {
      if (this.agentId) {
        let params = new URLSearchParams();
        params.append('id', this.agentId);

        get(ALL_AGENTS, params).then(response => {
          let agentData = response.data.resultList[0];

          this.name = agentData.name;
          this.email = agentData.email;
          this.authority = agentData.authority;
        })
      }
    }
  },

  mounted() {
    this.getAgentDetails();
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