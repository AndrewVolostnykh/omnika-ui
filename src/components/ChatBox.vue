<template>
  <div class="container">
    <div class="row rounded-lg overflow-hidden shadow h-25">
        <div class="px-4 py-5 chat-box bg-white">
          <!-- Sender Message-->
          <div class="media"
               v-bind:class="message.senderType === 'INTERNAL' ? 'd-flex justify-content-end' : 'w-50 mb-3'"
               v-for="message in this.messages" :key="message.id">
            <img v-if="message.senderType !== 'INTERNAL'" src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle">
            <div class="media-body"
                 v-bind:class="message.senderType === 'INTERNAL' ? '' : 'ml-3'">
              <div class="rounded py-2 px-3 mb-2"
                   v-bind:class="message.senderType === 'INTERNAL' ? 'bg-primary' : 'bg-light'"
              >
                <p class="text-small mb-0" v-bind:class="message.senderType === 'INTERNAL' ? 'text-white' : 'text-muted'">
                  {{message.text}}
                </p>
              </div>
              <p class="small text-muted">12:00 PM | Aug 13</p>
            </div>
          </div>
        </div>

        <!-- Typing area -->
        <form action="#" class="bg-light" @submit.prevent="postMessage()">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Type a message" v-model="this.messageText">
            <button class="btn btn-outline-secondary" type="submit">Send</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ALL_MESSAGES} from "@/backendurls";
import {mapGetters} from "vuex";
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";

export default {
  props: ['activeChatId'],

  data() {
    return {
      messages: [],
      messageText: ''
    }
  },

  methods: {
    getMessages() {
      if (!this.activeChatId) {
        return;
      }

      const params = new URLSearchParams();
      params.append('chatId', this.activeChatId);

      axios({
        method: 'get',
        url: ALL_MESSAGES,
        params: params,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }).then(response => {
        this.messages = response.data.content.reverse();
      });
    },

    postMessage() {
      if (!this.activeChatId) {
        return;
      }

      const params = new URLSearchParams();
      params.append('chatId', this.activeChatId);

      axios({
        method: 'post',
        url: ALL_MESSAGES,
        params: params,
        data: {
          text: this.messageText
        },
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      this.messageText = '';
      this.getMessages();
    }
  },

  mounted() {
    this.getMessages();
  },

  computed: {
    ...mapGetters('auth', {
      token: USER_ACCESS_TOKEN_GETTER,
    })
  },
};
</script>

<style scoped>
body {
  background-color: #74EBD5;
  background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);

  min-height: 100vh;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  width: 5px;
  background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  width: 1em;
  background-color: #ddd;
  outline: 1px solid slategrey;
  border-radius: 1rem;
}

.text-small {
  font-size: 1.1rem;
}

.chat-box {
  max-height: 900px;
  min-height: 900px;
  overflow-y: scroll;
}

.rounded-lg {
  border-radius: 0.5rem;
}

input::placeholder {
  font-size: 0.9rem;
  color: #999;
}

</style>