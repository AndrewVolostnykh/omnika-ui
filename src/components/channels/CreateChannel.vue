<template>
  <div class="o-modal">
    <h4>Create new channel</h4>
    <div>
      <div class="alert alert-danger" v-if="serverError">{{serverError}}</div>
      <form @submit.prevent="createChannel()">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name"/>
          <div class="text-danger" v-if="errors.name">{{errors.name}}</div>

          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{channelType || 'Select channel type'}}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" @click="useChannelType('TELEGRAM')">TELEGRAM</a></li>
            </ul>
          </div>

          <div id="telegram-channel-configuration" v-if="channelType==='TELEGRAM'">
            <label>Bot token</label>
            <input type="text" class="form-control" v-model="botToken"/>
            <div class="text-danger" v-if="errors.botToken">{{errors.botToken}}</div>

            <label>Bot Username</label>
            <input type="text" class="form-control" v-model="botUsername"/>
            <div class="text-danger" v-if="errors.botUsername">{{errors.botUsername}}</div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Save</button>
        <button class="btn btn-secondary" v-on:click="closeThis">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ALL_CHANNELS} from "@/backendurls";
import {mapGetters} from "vuex";
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";

export default {
  data() {
    return {
      name: '',
      botToken: '',
      botUsername: '',

      channelType: '',
      errors: [],
      serverError: ''
    }
  },

  computed: {
    ...mapGetters('auth', {
      token: USER_ACCESS_TOKEN_GETTER,
    })
  },

  methods: {
    createChannel() {
      if (!this.name) {
        this.errors['name'] = 'Name could not be empty';
      }

      if (this.channelType === 'TELEGRAM') {
        if (!this.botToken) {
          this.errors['botToken'] = 'Bot Token could not be empty';
        }

        if (!this.botUsername) {
          this.errors['botUsername'] = 'Bot Username could not be empty'
        }

        axios({
          method: 'post',
          url: ALL_CHANNELS,
          data: {
            name: this.name,
            type: this.channelType,
            configuration: {
              type: this.channelType,
              botToken: this.botToken,
              botUsername: this.botUsername
            }
          },
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        }).then(() => {
          this.$emit('closeWithUpdate');
        }).catch(error => {
          this.serverError = error.response.data.code;
        })

      }
    },

    useChannelType(channelType) {
      this.channelType = channelType;
    },

    closeThis() {
      this.$emit('closeIt');
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