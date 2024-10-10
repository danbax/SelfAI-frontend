<!-- HomeView/Chat/ChatTop/PinnedMessage.vue -->
<script setup lang="ts">
import type { IConversation } from "@src/types";
import { inject, computed } from "vue";
import useStore from "@src/store/store";
import { getConversationIndex } from "@src/utils";
import { EyeSlashIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import SlideTransition from "@src/components/ui/transitions/SlideTransition.vue";
import MessagePreview from "@src/components/views/HomeView/Chat/MessagePreview.vue";

const store = useStore();

const activeConversation = inject<IConversation | undefined>("activeConversation");

const showPinnedMessage = computed(() => {
  return activeConversation?.pinnedMessage && !activeConversation?.pinnedMessageHidden;
});

const isAdmin = computed(() => {
  return store.user && activeConversation?.admins?.includes(store.user.id);
});

const handleHidePinnedMessage = () => {
  if (activeConversation) {
    const activeConversationIndex = getConversationIndex(activeConversation.id);
    if (store.conversations && activeConversationIndex !== undefined && activeConversationIndex !== null) {
      store.conversations[activeConversationIndex].pinnedMessageHidden = true;
    }
  }
};

const handleRemovePinnedMessage = () => {
  if (activeConversation) {
    const activeConversationIndex = getConversationIndex(activeConversation.id);
    if (store.conversations && activeConversationIndex !== undefined && activeConversationIndex !== null) {
      store.conversations[activeConversationIndex].pinnedMessage = undefined;
    }
  }
};
</script>

<template>
  <SlideTransition animation="shelf-down">
    <div
      v-if="showPinnedMessage"
      class="absolute z-10 w-full px-5 py-2 bg-white dark:bg-gray-800 flex items-center justify-between transition-all duration-500"
    >
      <MessagePreview :message="activeConversation?.pinnedMessage" />

      <div class="flex">
        <IconButton
          title="hide pinned message"
          aria-label="hide pinned message"
          @click="handleHidePinnedMessage"
          class="ic-btn-ghost-primary w-7 h-7"
          :class="{ 'mr-3': isAdmin }"
        >
          <EyeSlashIcon class="w-[1rem] h-[1rem]" />
        </IconButton>

        <IconButton
          v-if="isAdmin"
          @click="handleRemovePinnedMessage"
          class="ic-btn-ghost-primary w-7 h-7"
          title="close pinned message"
          aria-label="close pinned message"
        >
          <XCircleIcon class="w-[1rem] h-[1rem]" />
        </IconButton>
      </div>
    </div>
  </SlideTransition>
</template>