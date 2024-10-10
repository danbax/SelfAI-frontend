<script setup lang="ts">
import { computed, ref, onMounted, watch, nextTick } from 'vue';
import { useMessageStore } from '@src/store/messages';
import Message from "@src/components/views/HomeView/Chat/ChatMiddle/Message/Message.vue";
import TimelineDivider from "@src/components/views/HomeView/Chat/ChatMiddle/TimelineDivider.vue";

const props = defineProps<{
  selectedMessages: number[];
  handleSelectMessage: (messageId: number) => void;
  handleDeselectMessage: (messageId: number) => void;
}>();

const messageStore = useMessageStore();
const chatContainer = ref<HTMLElement | null>(null);

const sortedMessages = computed(() => {
  return [...messageStore.messages].sort((a, b) => 
    new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
  );
});

const isFollowUp = (index: number): boolean => {
  if (index === 0) return false;
  const currentMessage = sortedMessages.value[index];
  const previousMessage = sortedMessages.value[index - 1];
  return currentMessage.role === previousMessage.role;
};

const isSelf = (message: { role: string }): boolean => {
  return message.role === 'user';
};

const renderDivider = (index: number): boolean => {
  if (index === 0) return false;
  const currentMessage = sortedMessages.value[index];
  const previousMessage = sortedMessages.value[index - 1];
  const currentDate = new Date(currentMessage.createDate).toDateString();
  const previousDate = new Date(previousMessage.createDate).toDateString();
  return currentDate !== previousDate;
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

onMounted(() => {
  scrollToBottom();
});

watch(() => messageStore.messages, () => {
  scrollToBottom();
}, { deep: true });
</script>

<template>
  <div 
    ref="chatContainer"
    class="grow px-5 py-5 flex flex-col overflow-y-scroll scrollbar-hidden"
  >
    <template v-for="(message, index) in sortedMessages" :key="message.id">
      <TimelineDivider v-if="renderDivider(index)" :date="new Date(message.create_date)" />
      <Message
        :message="message"
        :self="isSelf(message)"
        :follow-up="isFollowUp(index)"
        :divider="renderDivider(index)"
        :selected="selectedMessages.includes(message.id)"
        :handle-select-message="handleSelectMessage"
        :handle-deselect-message="handleDeselectMessage"
      />
    </template>
  </div>
</template>