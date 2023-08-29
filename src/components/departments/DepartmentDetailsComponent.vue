<template>
  <div class="o-modal">
    <h4>Department [ {{this.depId}} ]</h4>
    <div>
      <div class="alert alert-danger" v-if="serverError">{{serverError}}</div>
      <form @submit.prevent="updateDepartment()">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name"/>
          <div class="text-danger" v-if="errors.name">{{errors.name}}</div>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <button class="btn btn-secondary" v-on:click="closeThis">Cancel</button>
      </form>
      <div>
        <h5>Assigned Agents</h5>
        <ol class="list-group list-group-numbered">
          <li v-for="agent in this.assignedAgents" :key="agent.id" class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">{{agent.name}}</div>
              {{agent.email}}
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";
import axios from "axios";
import {ALL_DEPARTMENTS, ASSIGNED_USERS_PART} from "@/backendurls";
import ErrorPrettyPrinter from "@/services/ErrorPrettyPrinter";

export default {
  data() {
    return {
      name: '',
      assignedAgents: [],
      assignedChannels: [],
      serverError: '',
      errors: []
    }
  },

  props: ['depId'],

  computed: {
    ...mapGetters('auth', {
      token: USER_ACCESS_TOKEN_GETTER,
    })
  },

  methods: {
    closeThis() {
      this.$emit('closeDepDetails');
    },

    updateDepartment() {
      // console.log('update department called')
    },

    getDepartment() {
      if (!this.token) {
        this.$router.push('/login');
        return;
      }

      axios({
        method: 'get',
        url: ALL_DEPARTMENTS + '/' + this.depId,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }).then(response => {
        this.name = response.data.name;
      }).catch(error => {
        this.serverError = new ErrorPrettyPrinter(error.response.data.code).print();
      });
    },

    getAssignedAgents() {
      if (!this.token) {
        this.$router.push('/login');
        return;
      }

      axios({
        method: 'get',
        url: `${ALL_DEPARTMENTS}/${this.depId}/${ASSIGNED_USERS_PART}` ,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }).then(response => {
        this.assignedAgents = response.data;
      }).catch(error => {
        this.serverError = new ErrorPrettyPrinter(error.response.data.code).print();
      });
    }
  },

  mounted() {
    this.getDepartment();
    this.getAssignedAgents();
  }
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