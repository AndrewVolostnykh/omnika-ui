<template>
<div>
  <div>
    <navigation-bar active="HOME"></navigation-bar>
  </div>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>Main Page</div>
      <div v-if="organizationName">{{organizationName}}</div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import {mapGetters} from 'vuex';
import {ORGANIZATION_DETAILS_URL} from "@/backendurls";
import {USER_ACCESS_TOKEN_GETTER, ORGANIZATION_ID_GETTER} from "@/store/storeConstants";
import NavigationBar from "@/components/NavigationBar";

export default {
  components: {NavigationBar},
  data() {
    return {
      organizationName: ''
    };
  },
  computed: {
    ...mapGetters('auth', {
      token: USER_ACCESS_TOKEN_GETTER,
      organizationId: ORGANIZATION_ID_GETTER
    })
  },
  mounted() {
    if (!this.token) {
      this.$router.push('/login');
      return;
    }

    axios({
      method: 'get',
      url: ORGANIZATION_DETAILS_URL + '/' + this.organizationId,
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
    .then(response => {
      this.organizationName = response.data.name;
    })
  }

};
</script>

<style scoped></style>