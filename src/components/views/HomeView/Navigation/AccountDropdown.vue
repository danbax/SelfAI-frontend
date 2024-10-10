<script setup lang="ts">
import useStore from "@src/store/store";
import { Icon } from '@iconify/vue';

const store = useStore();
</script>

<template>
  <div class="relative">
    <!--toggle dropdown button-->
    <button
      class="rounded-full active:scale-110 focus:outline-none focus:scale-110 transition duration-200 ease-out overflow-hidden pulsating-glow"
      :style="{
        '--glow-color': store.settings.darkMode ? '#8B5CF6' : '#A78BFA',
        '--bg-color': store.settings.darkMode ? '#4C1D95' : '#8B5CF6',
      }"
      aria-controls="profile-menu"
      aria-label="toggle profile menu"
    >
      <div
        id="home-button"
        class="w-8 h-8 flex items-center justify-center"
      >
      <Icon icon="mdi:home" class="w-6 h-6 text-color" />
      </div>
    </button>
  </div>
</template>

<style scoped>
@keyframes pulsate {
  0% {
    box-shadow: 0 0 8px var(--glow-color), 0 0 16px var(--glow-color);
  }
  50% {
    box-shadow: 0 0 16px var(--glow-color), 0 0 24px var(--glow-color);
  }
  100% {
    box-shadow: 0 0 8px var(--glow-color), 0 0 16px var(--glow-color);
  }
}

.pulsating-glow {
  background-color: var(--bg-color);
  animation: pulsate 2s infinite;
}
</style>