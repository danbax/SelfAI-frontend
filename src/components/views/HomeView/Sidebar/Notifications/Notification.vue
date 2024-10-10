<script setup lang="ts">
import { computed } from 'vue';
import { Notification } from '@src/store/notifications';
import { useNotificationsStore } from '@src/store/notifications';
import { Icon } from '@iconify/vue';
import {
  ArrowPathIcon,
  LockClosedIcon,
  PlusCircleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps<{
  notification: Notification;
}>();

const notificationsStore = useNotificationsStore();

const iconComponent = computed(() => {
  switch (props.notification.icon) {
    case 'account-update':
      return ArrowPathIcon;
    case 'security':
      return LockClosedIcon;
    case 'added-to-group':
      return PlusCircleIcon;
    default:
      return CheckCircleIcon;
  }
});

const handleMarkAsRead = async () => {
  await notificationsStore.markAsRead(props.notification.id);
};
</script>

<template>
  <div
    class="w-full px-5 py-5 mb-3 flex rounded outline-none cursor-pointer"
    tabindex="0"
    :aria-label="notification.text"
    @click="handleMarkAsRead"
  >
    <div class="mr-4">
      <div
        class="w-7 h-7 flex justify-center items-center rounded-full transition duration-500"
        :class="{
          'bg-blue-100 dark:bg-blue-600': notification.icon === 'account-update',
          'bg-yellow-100 dark:bg-yellow-600': notification.icon === 'security',
          'bg-green-100 dark:bg-green-600': notification.icon === 'added-to-group',
        }"
      >
        <Icon :icon="notification.icon" class="text-yellow-500 dark:text-white" />
      </div>
    </div>

    <div class="grow">
      <p class="heading-2 text-color mb-4">
        {{ notification.title }}
      </p>

      <p class="body-2 text-color">
        {{ notification.text }}
      </p>
    </div>

    <div class="ml-4 flex items-start">
      <div
        class="w-2 h-2 rounded-full"
        :class="notification.isRead ? 'bg-gray-300' : 'bg-blue-500'"
      ></div>
    </div>
  </div>
</template>