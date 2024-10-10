<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useNotificationsStore } from '@src/store/notifications';
import NoNotifications from "@src/components/states/empty-states/NoNotifications.vue";
import Circle2Lines from "@src/components/states/loading-states/Circle2Lines.vue";
import Notification from "@src/components/views/HomeView/Sidebar/Notifications/Notification.vue";
import SidebarHeader from "@src/components/views/HomeView/Sidebar/SidebarHeader.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import { CheckIcon } from "@heroicons/vue/24/outline";

const notificationsStore = useNotificationsStore();
const containerRef = ref<HTMLElement | null>(null);

const notifications = computed(() => notificationsStore.notifications);
const loading = computed(() => notificationsStore.loading);
const hasMore = computed(() => notifications.value.length < notificationsStore.totalNotifications);

onMounted(() => {
  notificationsStore.fetchNotifications();
});

const handleScroll = async (event: Event) => {
  const target = event.target as HTMLElement;
  if (
    !loading.value &&
    hasMore.value &&
    target.scrollTop + target.clientHeight >= target.scrollHeight - 100
  ) {
    await notificationsStore.fetchNotifications();
  }
};

const handleMarkAllAsRead = async () => {
  await notificationsStore.markAllAsRead();
};
</script>

<template>
  <div>
    <SidebarHeader>
      <template v-slot:title>Notifications</template>
      <template v-slot:actions>
        <IconButton
          class="ic-btn-ghost-primary w-7 h-7"
          @click="handleMarkAllAsRead"
          title="Mark all as read"
          aria-label="Mark all as read"
        >
          <CheckIcon class="w-[1.25rem] h-[1.25rem]" />
        </IconButton>
      </template>
    </SidebarHeader>

    <div
      ref="containerRef"
      class="w-full h-full scroll-smooth scrollbar-hidden"
      style="overflow-x: visible; overflow-y: scroll"
      @scroll="handleScroll"
    >
      <Circle2Lines v-if="loading && notifications.length === 0" v-for="item in 6" :key="item" />

      <template v-if="notifications.length > 0">
        <Notification
          v-for="notification in notifications"
          :notification="notification"
          :key="notification.id"
        />
        <Circle2Lines v-if="loading" />
      </template>

      <NoNotifications v-if="!loading && notifications.length === 0" />
    </div>
  </div>
</template>