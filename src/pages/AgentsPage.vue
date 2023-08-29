<template>
  <div>
    <div>
      <navigation-bar active="AGENTS"></navigation-bar>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2>Agents page</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Authority</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agent in agents" :key="agent.id">
              <td>{{agent.name}}</td>
              <td>{{agent.email}}</td>
              <td>{{agent.authority}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavigationBar from "@/components/NavigationBar";
import {ALL_AGENTS} from "@/backendurls";
import {mapGetters} from "vuex";
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";
export default {
  data() {
    return {
      agents: []
    }
  },

  components: {NavigationBar},
  computed: {
    ...mapGetters('auth', {
      token: USER_ACCESS_TOKEN_GETTER,
    })
  },

  mounted() {
    axios({
        method: 'get',
        url: ALL_AGENTS,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
    }).then(response => {
      this.agents = response.data.resultList;
    })
  }
};
</script>