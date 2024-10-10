<script setup lang="ts">
import { Chat } from '@src/store/chats';
import Conversation from "./Conversation.vue";
import { IConversation } from '@src/types';

const props = defineProps<{
  filteredConversations: any[];
  //filteredConversations: IConversation[];
}>();
</script>

<template>
  <div>
    <Conversation
      v-for="conversation in props.filteredConversations"
      :conversation="conversation"
      :key="conversation.id"
      role="listitem"
    />
  </div>
</template>