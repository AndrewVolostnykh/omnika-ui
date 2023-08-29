<template>
  <div class="list-group">
    <channel-list-item v-for="channel in this.channels" :key="channel.id"
                       :channel-name="channel.name"
                       :channel-type="channel.type"
                       :channel-id="channel.id"
                       :active-channel-id="selectedChannelId"
                       @click="selectThisChannel(channel.id)"

    />
  </div>
</template>

<script>
import ChannelListItem from "@/components/channels/ChannelListItem";
export default {
  props: ['orgChannels'],
  components: {ChannelListItem},

  data() {
    return {
      selectedChannelId: '',
      channels: this.orgChannels,
    }
  },

  methods: {
    selectThisChannel(channelId) {
      this.selectedChannelId = channelId;
      this.$emit('channelSelected', channelId);
    }
  }
};
</script>