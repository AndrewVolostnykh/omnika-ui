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
            <tr v-for="agent in agents" :key="agent.id" @click="showAgentDetails = agent.id">
              <td>{{agent.name}}</td>
              <td>{{agent.email}}</td>
              <td>{{agent.authority}}</td>
            </tr>
          </tbody>
        </table>

        <button
            type="button"
            class="btn btn-primary"
            @click="showCreateModal = true"
        >
          Create
        </button>
      </div>

      <create-agent
          v-if="showCreateModal"
          @closeCreateAgent="closeCreateAgent"
          @closeAndUpdateCreateAgent="closeCreateAgentWithUpdate"
      />

      <agent-details
          v-if="showAgentDetails"
          :agent-id="showAgentDetails"
          @closeAgentDetails="closeAgentDetails"
          :key="showAgentDetails"
          @closeDetailsWithUpdate="closeAgentDetailsWithUpdate"
      />
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import {ALL_AGENTS} from "@/backendurls";
import {mapGetters} from "vuex";
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";
import AgentDetails from "@/components/agents/AgentDetails";
import CreateAgent from "@/components/agents/CreateAgent";
import {get} from "@/services/axiosAuthorized";

export default {
  data() {
    return {
      agents: [],
      showAgentDetails: '',
      showCreateModal: false
    }
  },

  components: {AgentDetails, NavigationBar, CreateAgent},
  computed: {
    ...mapGetters('auth', {
      token: USER_ACCESS_TOKEN_GETTER,
    })
  },

  methods: {
    closeAgentDetails() {
      this.showAgentDetails = '';
    },

    closeAgentDetailsWithUpdate() {
      console.log('jopajopajopa')
      this.showAgentDetails = '';
      this.getAgents();
    },

    closeCreateAgent() {
      this.showCreateModal = false;
    },

    getAgents() {
      let sortingParam = new URLSearchParams();
      sortingParam.append('sorting', 'name')

      get(ALL_AGENTS, sortingParam).then(response => {
        this.agents = response.data.resultList;
      })
    },

    closeCreateAgentWithUpdate() {
      this.getAgents();
      this.closeCreateAgent();
    }
  },

  mounted() {
    this.getAgents();
  }
};
</script>