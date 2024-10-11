<script setup lang="ts">
import { computed } from 'vue';
import { Chat, useChatStore } from '@src/store/chats';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps<{
  conversation: any;
  //conversation: Chat;
}>();

const chatStore = useChatStore();
const router = useRouter();

const lastMessage = computed(() => {
  return "last message";
});

const isActive = computed(() => {
  return chatStore.currentChat?.id === props.conversation.id;
});

const handleSelectConversation = () => {
  chatStore.setCurrentChat(props.conversation);
  router.push({ path: `/chat/${props.conversation.id}/` });
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
</script>

<template>
  <div class="select-none">
    <button
      :aria-label="'conversation from ' + formatDate(conversation.createDatee)"
      tabindex="0"
      @click="handleSelectConversation"
      class="w-full h-[5.75rem] px-5 py-6 mb-3 flex rounded focus:bg-indigo-50 dark:active:bg-gray-600 dark:focus:bg-gray-600 dark:hover:bg-gray-600 hover:bg-indigo-50 active:bg-indigo-100 focus:outline-none transition duration-500 ease-out"
      :class="{
        'md:bg-indigo-50': isActive,
        'md:dark:bg-gray-600': isActive,
      }"
    >
      <div class="mr-4">
        <div class="w-7 h-7 rounded-full bg-cover bg-center bg-blue-120 dark:bg-blue-800">
          <Icon
            :icon="conversation.category.icon"
            class="w-7 h-7 text-blue-500 dark:text-blue-300"
          />
        </div>
      </div>

      <div class="w-full flex flex-col">
        <div class="w-full">
          <div class="flex items-start">
            <div class="grow mb-4 text-start">
              <p class="heading-2 text-color">
                {{ conversation.session.title }}
              </p>
            </div>
            <p class="body-1 text-color">
              {{ formatDate(conversation.createDate) }}
            </p>
          </div>
        </div>

        <div class="flex justify-between">
          <div>
            <p class="body-2 text-color flex justify-start items-center">
              {{ conversation.session.text.substring(0, 50) }}
              <span v-show="conversation.session.text.length > 50">...</span>
            </p>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>