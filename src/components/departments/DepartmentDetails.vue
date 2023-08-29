<template>
  <div class="o-modal">
    <h4>Department [{{this.name}}]</h4>
    <div>
      <div class="alert alert-danger" v-if="serverError">{{serverError}}</div>
      <form @submit.prevent="updateDepartment()">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name"/>
          <div class="text-danger" v-if="errors.name">{{errors.name}}</div>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
        <button class="btn btn-secondary" v-on:click="closeThis">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
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

  methods: {
    closeThis() {
      this.$emit('closeDepDetails');
    },

    updateDepartment() {
      // console.log('update department called')
    }
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