<template>
  <div>
    <a href="#"
       class="list-group-item list-group-item-action"
       v-bind:class="(channelId === activeChannelId) && 'active'"
       aria-current="true">

      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{this.channelName}}</h5>
<!--        <small>5 new</small>-->
      </div>
      <!--      <p class="mb-1">Last message</p>-->
      <small>{{ this.channelType }}</small>
    </a>
  </div>
</template>

<script>
export default {
  props: ['channelName', 'channelType', 'channelId', 'activeChannelId'],

}
</script>