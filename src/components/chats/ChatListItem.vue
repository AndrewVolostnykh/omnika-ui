<template>
  <div>
    <a href="#" class="list-group-item list-group-item-action" v-bind:class="(chatId === activeChatId) && 'active'" aria-current="true">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{authorName}}</h5>
        <small>{{lastMessageDate}}</small>
      </div>
      <p class="mb-1">{{lastMessageText}}</p>
<!--      <span class="badge bg-primary rounded-pill">5</span>-->
    </a>
  </div>
</template>

<script>

export default {
  props: ['authorName', 'lastMessageDate', 'lastMessageText', 'chatId', 'activeChatId'],
}

</script>