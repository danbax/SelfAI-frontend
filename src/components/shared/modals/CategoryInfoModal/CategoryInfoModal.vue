<script setup lang="ts">
import type { ICategory } from "@src/types";
import { computed, ref, onMounted, watch } from "vue";
import { useSessionsStore } from '@src/store/sessions';
import { useMessageStore } from '@src/store/messages';
import { CreateChatDto, useChatStore } from '@src/store/chats';
import CategoryInfoTab from "@src/components/shared/modals/CategoryInfoModal/CategoryInfoTab.vue";
import SessionDetailsTab from "@src/components/shared/modals/CategoryInfoModal/SessionDetailsTab.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import SlideTransition from "@src/components/ui/transitions/SlideTransition.vue";
import Modal from "@src/components/ui/utils/Modal.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  category: ICategory;
  open: boolean;
  closeModal: () => void;
}>();

const router = useRouter();
const sessionsStore = useSessionsStore();
const messageStore = useMessageStore();
const chatStore = useChatStore();
const activePageName = ref("category-info");
const animation = ref("slide-left");

const currentSession = computed(() => sessionsStore.currentSession);

const ActivePage = computed((): any => {
  switch(activePageName.value) {
    case "sessions":
      return CategoryInfoTab;
    case "session-details":
      return SessionDetailsTab;
    default:
      return CategoryInfoTab;
  }
});

const handleChangeActiveTab = (event: {
  tabName: string;
  animationName: string;
  session?: any;
}) => {
  animation.value = event.animationName;
  activePageName.value = event.tabName;
};

watch(() => props.open, async (value) => {
  if(!value) return;
  await sessionsStore.getSessions({ 
    categoryId: props.category.categoryId,
    languageCode: 'english'
   });
});

watch(() => chatStore.currentChatId, (newChatId) => {
  if (newChatId) {
    messageStore.fetchMessagesByChat(newChatId);
    router.push(`/chat/${newChatId}`);
    props.closeModal();
  }
});

const startSession = () => {
  if (currentSession.value === null) {
    console.error("No session selected");
    return;
  }
  
  const createChatDto: CreateChatDto = {
    sessionId: currentSession.value.sessionId,
  }
  
  chatStore.startNewChat(createChatDto);
};
</script>

<template>
  <Modal :open="props.open" :closeModal="props.closeModal">
    <template v-slot:content>
      <div class="w-[18.75rem] py-6 overflow-x-hidden rounded bg-white dark:bg-gray-800">
        <SlideTransition :animation="animation">
          <component
            @active-page-change="handleChangeActiveTab"
            @close-modal="props.closeModal()"
            :is="ActivePage"
            :category="props.category"
            :close-modal="closeModal"
            :sessions="sessionsStore.sessions"
            :current-session="currentSession"
            :current-session-id="currentSession"
          />
        </SlideTransition>

        <div v-show="activePageName === 'session-details'" class="px-5 pt-5">
          <Button 
          class="contained-success contained-text w-full" 
          @click="startSession"
          >
            Start Session
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>