<template>
  <div class="bg-gray-900 text-gray-100">
    <div class="px-5 py-4 flex justify-between items-center border-b border-gray-700">
      <p id="modal-title" class="text-xl font-semibold" tabindex="0">
        Sessions
      </p>
      <IconButton
        @click="$emit('close-modal')"
        class="p-2 text-gray-400 hover:text-gray-200 transition-colors"
      >
        <Icon icon="mdi:close-circle" class="w-6 h-6" />
      </IconButton>
    </div>
    <ScrollBox class="max-h-[24rem] overflow-y-auto">
      <div class="divide-y divide-gray-700">
        <div 
          v-for="session in sessions" 
          :key="session.id" 
          @click="(session.isUnlocked || session.isCompleted) && handleSessionClick(session)" 
          :class="[
            'px-6 py-4 hover:bg-gray-800 transition-colors duration-200 flex items-center',
            (session.isUnlocked || session.isCompleted) ? 'cursor-pointer' : 'cursor-not-allowed',
          ]"
        >
          <div :class="['w-8 h-8 flex items-center justify-center rounded-full mr-4', getIconBgColor(session)]">
            <Icon :icon="getIcon(session)" class="w-5 h-5 text-gray-100" />
          </div>
          <h3 class="text-lg font-medium text-gray-200">{{ session.title }}</h3>
        </div>
      </div>
    </ScrollBox>
  </div>
</template>

<script setup lang="ts">
import { useSessionsStore } from '@src/store/sessions';
import { computed } from 'vue';
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";
import { Icon } from '@iconify/vue';

const sessionsStore = useSessionsStore();
const sessions = computed(() => sessionsStore.sessions);

const handleSessionClick = async (session: any) => {
  await sessionsStore.setCurrentSession(session);
  emit('active-page-change', {
    tabName: 'session-details',
    animationName: 'slide-left',
    session: session
  });
};

const emit = defineEmits(['active-page-change', 'close-modal']);

const getIcon = (session: any) => {
  if (session.isCompleted) {
    return 'mdi:check-circle';
  } else if (session.isUnlocked) {
    return 'mdi:lock-open';
  } else {
    return 'mdi:lock';
  }
};

const getIconBgColor = (session: any) => {
  if (session.isCompleted) {
    return 'bg-green-500';
  } else if (session.isUnlocked) {
    return 'bg-blue-500';
  } else {
    return 'bg-gray-500';
  }
};
</script>