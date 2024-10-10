<script setup lang="ts">
import type { IConversation } from "@src/types";
import { inject, ref, computed } from "vue";
import useStore from "@src/store/store";
import SearchModal from "@src/components/shared/modals/SearchModal/SearchModal.vue";
import PinnedMessage from "@src/components/views/HomeView/Chat/ChatTop/PinnedMessage.vue";
import ConversationInfoSection from "./ConversationInfoSection.vue";
import SelectSection from "./SelectSection.vue";

const props = defineProps<{
  selectMode: boolean;
  selectAll: boolean;
  handleSelectAll: () => void;
  handleDeselectAll: () => void;
  handleCloseSelect: () => void;
}>();

const store = useStore();
const activeConversation = inject<IConversation | undefined>("activeConversation");
const openSearch = ref(false);
const openInfo = ref(false);

const showPinnedMessage = computed(() => {
  return activeConversation?.pinnedMessage && !activeConversation?.pinnedMessageHidden;
});

const handleOpenSearch = () => {
  openSearch.value = true;
};

const handleOpenInfo = () => {
  openInfo.value = true;
};

const handleCloseVoiceCallModal = (endCall: boolean) => {
  if (endCall) {
    store.activeCall = undefined;
    store.callMinimized = false;
  }
  if (store.openVoiceCall) {
    store.openVoiceCall = false;
    store.callMinimized = true;
  }
};
</script>

<template>
  <div class="w-full">
    <div class="w-full min-h-[5.25rem] px-5 py-6">
      <SelectSection
        v-if="props.selectMode"
        :select-mode="props.selectMode"
        :select-all="props.selectAll"
        :handle-close-select="props.handleCloseSelect"
        :handle-select-all="props.handleSelectAll"
        :handle-deselect-all="props.handleDeselectAll"
      />
      <ConversationInfoSection
        v-else
        :handle-open-info="handleOpenInfo"
        :handle-open-search="handleOpenSearch"
      />
    </div>
    <div
      class="relative transition-[padding] duration-200"
      :class="{ 'pb-[3.75rem]': showPinnedMessage }"
    >
      <PinnedMessage v-if="activeConversation" :active-conversation="activeConversation" />
    </div>
    <SearchModal
      :open="openSearch"
      :close-modal="() => (openSearch = false)"
      :conversation="activeConversation"
    />
  </div>
</template>