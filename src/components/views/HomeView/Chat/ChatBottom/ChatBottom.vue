<!-- HomeView/Chat/ChatBottom/ChatBottom.vue -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { useMessageStore } from '@src/store/messages';
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import Textarea from "@src/components/ui/inputs/Textarea.vue";

const messageStore = useMessageStore();
const currentChat = computed(() => messageStore.currentChat);
const loaders = computed(() => messageStore.loaders);
const message = ref("");

const sendMessage = async () => {
  if (!message.value.trim() || !currentChat.value) return;
  try {
    const messageValue = message.value.trim();
    message.value = '';
    await messageStore.sendMessage({
      chat_id: currentChat.value.id,
      role: 'user',
      message: messageValue
    });
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

const updateMessage = (newValue: string) => {
  message.value = newValue;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.key === 'Enter' && event.shiftKey) || (event.key === 'Enter' && event.ctrlKey)) {
    event.preventDefault();
    sendMessage();
  }
};
</script>

<template>
  <div class="w-full">
    <div class="h-auto min-h-[5.25rem] p-5 flex items-end">
      <div class="grow md:mr-5 xs:mr-4 self-end">
        <div class="relative">
          <Textarea
            :value="message"
            @value-changed="updateMessage"
            @keydown="handleKeyDown"
            class="max-h-[5rem] pr-[3.125rem] resize-none scrollbar-hidden"
            auto-resize
            cols="30"
            rows="1"
            placeholder="Write your message here"
            aria-label="Write your message here, press Shift+Enter or Ctrl+Enter to send"
          />
        </div>
      </div>
      <div class="min-h-[2.75rem] flex">
        <IconButton
          :disabled="loaders.sendMessage"
          class="ic-btn-contained-primary w-7 h-7 active:scale-110"
          title="send message"
          aria-label="send message"
          @click="sendMessage"
        >
          <PaperAirplaneIcon class="w-[1.0625rem] h-[1.0625rem]" />
        </IconButton>
      </div>
    </div>
  </div>
</template>