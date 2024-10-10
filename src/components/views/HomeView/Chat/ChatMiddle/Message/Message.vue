<script setup lang="ts">
import { computed } from 'vue';
import { Message } from '@src/store/messages';

const props = defineProps<{
  message: Message;
  self: boolean;
  followUp: boolean;
  divider: boolean;
  selected: boolean;
  handleSelectMessage: (messageId: number) => void;
  handleDeselectMessage: (messageId: number) => void;
}>();

const messageClass = computed(() => {
  return {
    'self': props.self,
    'follow-up': props.followUp,
    'selected': props.selected,
  };
});

const toggleSelect = () => {
  if (props.selected) {
    props.handleDeselectMessage(props.message.id);
  } else {
    props.handleSelectMessage(props.message.id);
  }
};
</script>

<template>
  <div 
    :class="messageClass" 
    class="message-container"
    @click="toggleSelect"
  >
    <div v-if="!followUp" class="avatar-container">
      <!-- Add avatar component here -->
    </div>
    <div class="message-content">
      <p class="message-text">{{ message.message }}</p>
      <span class="message-time">{{ new Date(message.createDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) }}</span>
    </div>
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  margin-bottom: 8px;
}

.message-container.self {
  justify-content: flex-end;
}

.message-container.follow-up {
  margin-top: -4px;
}

.message-container.selected {
  background-color: rgba(0, 0, 0, 0.1);
}

.avatar-container {
  width: 40px;
  margin-right: 8px;
}

.message-content {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: #f0f0f0;
}

.self .message-content {
  background-color: #dcf8c6;
}

.message-text {
  margin: 0;
}

.message-time {
  font-size: 0.75rem;
  color: #888;
  margin-top: 4px;
  display: block;
}
</style>