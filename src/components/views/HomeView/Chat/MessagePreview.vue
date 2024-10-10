<script setup lang="ts">
import { computed } from 'vue';
import { Message } from '@src/store/messages';
import { shorten } from "@src/utils";

const props = defineProps<{
  message: Message;
  self?: boolean;
}>();


const senderName = computed(() => {
  return props.message.role === 'user' ? 'You' : 'Practitioner';
});

const messageContent = computed(() => {
  if (props.message.message) {
    return shorten(props.message.message, 60);
  }
  return '';
});

const messageType = computed(() => {
  // You might need to adjust this based on how message types are determined in your new structure
  if (props.message.message.startsWith('data:audio')) {
    return 'recording';
  }
  return 'text';
});
</script>

<template>
  <div
    v-if="props.message"
    class="border-l-2 pl-3 cursor-pointer outline-none border-opacity-50 duration-200"
    :class="['border-gray-900', 'dark:border-white', 'dark:border-opacity-50']"
    tabindex="0"
    :aria-label="'reply to: ' + senderName"
  >
    <!--name-->
    <p
      class="mb-3 font-semibold text-xs leading-4 tracking-[.01rem]"
      :class="[
        'text-black',
        'opacity-60',
        'dark:text-white',
        'dark:opacity-70',
      ]"
    >
      {{ senderName }}
    </p>

    <!--content-->
    <p
      v-if="messageType !== 'recording' && messageContent"
      class="body-2 text-black opacity-50 dark:text-white dark:opacity-70"
    >
      {{ messageContent }}
    </p>

    <!--recording title-->
    <p
      v-else-if="messageType === 'recording'"
      class="body-2 text-black opacity-50 dark:text-white dark:opacity-70"
    >
      recording 23s
    </p>
  </div>
</template>