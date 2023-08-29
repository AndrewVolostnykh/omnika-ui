<template #wrap>
  <div>
    <div>
      <navigation-bar active="DEPARTMENTS"></navigation-bar>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2>Departments</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="department in departments" :key="department.id" @click="showDepartmentDetails=department.id">
              <td>{{department.name}}</td>
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
      <department-details-component
          v-if="this.showDepartmentDetails"
          @closeDepDetails="closeDepartmentDetails"
          :depId=this.showDepartmentDetails />
      <create-department v-if="showCreateModal" @closeIt="closeCreateModal" @closeItAndUpdate="closeCreateModalAndUpdate" />
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import {mapGetters} from "vuex";
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";
import axios from "axios";
import {ALL_DEPARTMENTS} from "@/backendurls";
import CreateDepartment from "@/components/departments/CreateDepartment";
import DepartmentDetailsComponent from "@/components/departments/DepartmentDetailsComponent";

export default {
  data() {
    return {
      showCreateModal: false,
      showDepartmentDetails: '', // id of department
      departments: []
    }
  },

  methods: {
    closeCreateModal() {
      this.showCreateModal = false;
    },

    closeCreateModalAndUpdate() {
      this.showCreateModal = false;
      this.getDepartments();
    },

    closeDepartmentDetails() {
      this.showDepartmentDetails = '';
    },

    getDepartments() {
      axios({
        method: 'get',
        url: ALL_DEPARTMENTS,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }).then(response => {
        this.departments = response.data.resultList;
      });
    }
  },

  components: {DepartmentDetailsComponent, CreateDepartment, NavigationBar},
  computed: {
    ...mapGetters('auth', {
      token: USER_ACCESS_TOKEN_GETTER,
    })
  },

  mounted() {
    this.getDepartments();
  }
};
</script>