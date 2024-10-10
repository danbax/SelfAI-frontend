<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";
import { LockOpenIcon, LockClosedIcon, CheckCircleIcon } from "@heroicons/vue/24/solid";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import { computed } from 'vue';
import { defineEmits } from 'vue';
import { useSessionsStore } from '@src/store/sessions';

const sessionsStore = useSessionsStore();

const currentSession = computed(() => sessionsStore.currentSession);

const emit = defineEmits(['active-page-change']);

const getSessionIcon = computed(() => {
  if (!currentSession.value) return LockClosedIcon;
  if (currentSession.value.isCompleted) return CheckCircleIcon;
  if (currentSession.value.isUnlocked) return LockOpenIcon;
  return LockClosedIcon;
});

const getIconColor = computed(() => {
  if (!currentSession.value) return 'text-gray-500';
  if (currentSession.value.isCompleted) return 'text-green-500';
  if (currentSession.value.isUnlocked) return 'text-blue-500';
  return 'text-gray-500';
});

const getStatusText = computed(() => {
  if (!currentSession.value) return 'Locked';
  if (currentSession.value.isCompleted) return 'Completed';
  if (currentSession.value.isUnlocked) return 'Unlocked';
  return 'Locked';
});

const getBgColor = computed(() => {
  if (!currentSession.value) return 'bg-gray-500';
  if (currentSession.value.isCompleted) return 'bg-green-500';
  if (currentSession.value.isUnlocked) return 'bg-blue-500';
  return 'bg-gray-500';
});
</script>

<template>
  <div v-if="currentSession" class="bg-gray-900 text-gray-100">
    <div class="px-5 py-4 flex justify-between items-center border-b border-gray-700">
      <IconButton
        @click="$emit('active-page-change', { tabName: 'sessions', animationName: 'slide-right' })"
        class="p-2 text-gray-400 hover:text-gray-200 transition-colors"
      >
        <ArrowUturnLeftIcon class="w-5 h-5" />
      </IconButton>
    </div>

    <div class="px-5 py-4">
      <div class="flex items-center mb-4">
        <div :class="['w-12 h-12 flex items-center justify-center rounded-full mr-4', getBgColor]">
          <component :is="getSessionIcon" class="w-8 h-8 text-gray-100" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-100">{{ currentSession.title }}</h2>
          <p class="text-sm text-gray-400">{{ getStatusText }}</p>
        </div>
      </div>
      <p class="text-gray-300 mb-3">{{ currentSession.text }}</p>
    </div>
  </div>
</template>