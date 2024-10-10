// src/components/ChatList.vue

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useChatStore } from '@src/store/chats';
import { PencilSquareIcon } from "@heroicons/vue/24/outline";
import ComposeModal from "@src/components/shared/modals/ComposeModal/ComposeModal.vue";
import NoConversation from "@src/components/states/empty-states/NoConversation.vue";
import Circle2Lines from "@src/components/states/loading-states/Circle2Lines.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import FadeTransition from "@src/components/ui/transitions/FadeTransition.vue";
import ArchivedButton from "./ArchivedButton.vue";
import ConversationsList from "./ConversationsList.vue";
import SidebarHeader from "@src/components/views/HomeView/Sidebar/SidebarHeader.vue";
import { useRouter } from 'vue-router';

const chatStore = useChatStore();
const keyword = ref('');
const composeOpen = ref(false);
const openArchive = ref(false);
const page = ref(1);
const limit = ref(8);
const loading = ref(false);
const allLoaded = ref(false);

const router = useRouter();

const filteredConversations = computed(() => chatStore.chats);

const closeComposeModal = () => {
  composeOpen.value = false;
};

const loadMoreChats = async (replace = false) => {
  if (loading.value || (allLoaded.value && !replace)) return;
  
  loading.value = true;
  const { chats, total } = await chatStore.getAllChats({
    page: replace ? 1 : page.value,
    limit: limit.value,
    search: keyword.value,
    finished: openArchive.value
  });
  
  if (replace) {
    chatStore.replaceChats(chats);
    page.value = 1;
  } else {
    chatStore.appendChats(chats);
  }

  if (chats.length < limit.value || chatStore.chats.length >= total) {
    allLoaded.value = true;
  } else if (!replace) {
    page.value++;
  }
  
  loading.value = false;
};

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 100) {
    loadMoreChats();
  }
};

const goToSessions = () => {
  router.push({ path: '/categories' });
};

watch([keyword, openArchive], () => {
  allLoaded.value = false;
  loadMoreChats(true);
});

onMounted(async () => {
  await loadMoreChats(true);
});
</script>

<template>
  <div>
    <SidebarHeader>
      <template v-slot:title>Sessions</template>
      <template v-slot:actions>
        <IconButton
          class="ic-btn-ghost-primary w-7 h-7"
          @click="goToSessions"
          aria-label="compose conversation"
          title="compose conversation"
        >
          <PencilSquareIcon class="w-[1.25rem] h-[1.25rem]" />
        </IconButton>
      </template>
    </SidebarHeader>

    <div class="px-5 xs:pb-6 md:pb-5">
      <SearchInput
        v-model="keyword"
      />
    </div>
    <div
      role="list"
      aria-label="conversations"
      class="w-full h-full scroll-smooth scrollbar-hidden"
      style="overflow-x: visible; overflow-y: scroll"
      @scroll="handleScroll"
    >
      <Circle2Lines
        v-if="loading && filteredConversations.length === 0"
        v-for="item in 6"
        :key="item"
      />

      <div v-else>
        <div v-if="filteredConversations.length > 0">
          <FadeTransition>
            <ConversationsList
              :key="openArchive ? 'archive' : 'active'"
              :filtered-conversations="filteredConversations"
            />
          </FadeTransition>
        </div>

        <div v-else-if="!loading">
          <NoConversation v-if="chatStore.chats.length === 0" />
        </div>

        <div v-if="loading && filteredConversations.length > 0" class="flex justify-center py-4">
          <Circle2Lines />
        </div>

        <div v-if="allLoaded && filteredConversations.length > 0" class="text-center py-4 text-gray-500">
          No more conversations to load
        </div>
      </div>
    </div>

    <ComposeModal :open="composeOpen" :close-modal="closeComposeModal" />
  </div>
</template>