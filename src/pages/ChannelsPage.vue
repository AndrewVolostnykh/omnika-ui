<template>
  <div>
    <div>
      <navigation-bar active="CHANNELS" />
    </div>
    <div class="container-fluid main-container">
      <div class="row justify-content-start">
        <div class="col-2">
          <h4>Channels</h4>
          <button
              type="button"
              class="btn btn-primary"
              @click="showCreateChannelModal = true"
          >
            Create
          </button>
          <div class="list-group">
            <channel-list-item v-for="channel in this.channels" :key="channel.id"
                               :channel-name="channel.name"
                               :channel-type="channel.type"
                               :channel-id="channel.id"
                               :active-channel-id="selectedChannelId"
                               @click="selectThisChannel(channel.id)"

            />
          </div>
        </div>
        <div class="col-2">
          <h4>Chats</h4>
          <div class="list-group">
            <chat-list-item v-for="chat in channelChats" :key="chat.id"
                            :author-name="chat.name"
                            :last-message-text="chat.lastMessageText"
                            :last-message-date="chat.lastMessageDate"
                            :chat-id="chat.id"
                            :active-chat-id="selectedChatId"
                            @click="selectedChatId=chat.id"

            />
          </div>
        </div>
        <div class="col-8">
          <h4>Dialog</h4>
          <chat-box :active-chat-id="selectedChatId" :key="selectedChatId"/>
        </div>

        <create-channel v-if="showCreateChannelModal"
                        @closeIt="closeCreateChannelModal"
                        @closeWithUpdate="closeCreateChannelModalWithUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChatListItem from "@/components/chats/ChatListItem";
import ChannelListItem from "@/components/channels/ChannelListItem";
import NavigationBar from "@/components/NavigationBar";
import CreateChannel from "@/components/channels/CreateChannel";
import ChatBox from "@/components/ChatBox";
import axios from "axios";
import {ALL_CHANNELS, ALL_EXTERNAL_CHATS} from "@/backendurls";
import {mapGetters} from "vuex";
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";

export default {
  components: {ChatBox, ChatListItem, ChannelListItem, NavigationBar, CreateChannel},
  computed: {
    ...mapGetters('auth', {
      token: USER_ACCESS_TOKEN_GETTER,
    })
  },

  data() {
    return {
      channels: [],
      channelChats: [],
      selectedChannelId: '',
      selectedChatId: '',
      showCreateChannelModal: false
    }
  },

  methods: {
    getChannels() {
      axios({
        method: 'get',
        url: ALL_CHANNELS,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }).then(response => {
        this.channels = response.data.resultList;
      });
    },

    getChats() {
      const params = new URLSearchParams();
      params.append('channelId', this.selectedChannelId);

      axios({
        method: 'get',
        url: ALL_EXTERNAL_CHATS,
        headers: {
          'Authorization': `Bearer ${this.token}`
        },
        params: params,
      }).then(response => {
        this.channelChats = response.data.resultList;
      });
    },

    selectThisChannel(channelId) {
      this.selectedChannelId = channelId;
      this.getChats();

    },

    closeCreateChannelModal() {
      this.showCreateChannelModal = false;
    },

    closeCreateChannelModalWithUpdate() {
      this.showCreateChannelModal = false;
      this.getChannels();
    }
  },

  mounted() {
    this.getChannels();
  }
};
</script>

<style scoped>
.main-container {
  margin-left: 1%
}
</style>