<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useChatStore } from '@src/store/chats';
import { useMessageStore } from '@src/store/messages';
import NoChatSelected from "@src/components/states/empty-states/NoChatSelected.vue";
import Spinner from "@src/components/states/loading-states/Spinner.vue";
import ChatBottom from "@src/components/views/HomeView/Chat/ChatBottom/ChatBottom.vue";
import ChatMiddle from "@src/components/views/HomeView/Chat/ChatMiddle/ChatMiddle.vue";
import ChatTop from "@src/components/views/HomeView/Chat/ChatTop/ChatTop.vue";

const route = useRoute();
const chatId = parseInt(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);

const chatStore = useChatStore();
const messageStore = useMessageStore();
const selectMode = ref(false);
const selectAll = ref(false);
const selectedMessages = ref<number[]>([]);
const currentChat = computed(() => messageStore.currentChat);

onMounted(async () => {
  if (chatId) {
    await messageStore.fetchMessagesByChat(chatId);
  }
});

watch(() => chatStore.currentChat, async (newChat) => {
  if (newChat) {
    await messageStore.fetchMessagesByChat(newChat.id);
  } else {
    messageStore.clearMessages();
  }
});

const handleSelectMessage = (messageId: number) => {
  selectedMessages.value.push(messageId);
  if (messageStore.messages.length === selectedMessages.value.length) {
    selectAll.value = true;
  }
  if (!selectMode.value) {
    selectMode.value = true;
  }
};

const handleDeselectMessage = (messageId: number) => {
  selectAll.value = false;
  selectedMessages.value = selectedMessages.value.filter(id => id !== messageId);
  if (selectedMessages.value.length === 0) {
    selectMode.value = false;
  }
};

const handleSelectAll = () => {
  selectedMessages.value = messageStore.messages.map(message => message.id);
  selectAll.value = true;
};

const handleDeselectAll = () => {
  selectAll.value = false;
  selectedMessages.value = [];
};

const handleCloseSelect = () => {
  selectMode.value = false;
  selectAll.value = false;
  selectedMessages.value = [];
};
</script>

<template>
  <Spinner v-if="chatStore.loading || messageStore.loaders.fetchMessages" />

  <div v-else-if="chatId" class="h-full flex flex-col scrollbar-hidden">
    <ChatTop
      :select-all="selectAll"
      :select-mode="selectMode"
      :handle-select-all="handleSelectAll"
      :handle-deselect-all="handleDeselectAll"
      :handle-close-select="handleCloseSelect"
    />
    <ChatMiddle
      :selected-messages="selectedMessages"
      :handle-select-message="handleSelectMessage"
      :handle-deselect-message="handleDeselectMessage"
    />
    <ChatBottom />
  </div>

  <NoChatSelected v-else />
</template>