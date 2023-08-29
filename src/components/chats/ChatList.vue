<template>
  <div class="list-group">
    <chat-list-item v-for="chat in channelChats" :key="chat.id"
                    :author-name="chat.authorName"
                    :last-message-text="chat.lastMessageText"
                    :last-message-date="chat.lastMessageDate"
                    :chat-id="chat.id"
                    :active-chat-id="selectedChatId"
                    @click="selectedChatId=chat.id"

    />
  </div>
</template>

<script>
import ChatListItem from "@/components/chats/ChatListItem";
export default {
  props: ['channelChats'],
  components: {ChatListItem},

  data() {
    return {
      selectedChatId: ''
    }
  }
};
</script>