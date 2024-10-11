<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import Button from "@src/components/ui/inputs/Button.vue";

const props = defineProps<{
  data: any;
}>();

const emit = defineEmits(['save', 'reset']);

const isExpanded = ref(false);
const isEditMode = ref(false);

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const saveChanges = () => {
  emit('save', props.data.id);
};

const remove = () => {
  emit('reset', props.data.id);
};
</script>

<template>
  <div class="select-none">
    <button
      :aria-label="data.title"
      tabindex="0"
      class="w-full px-5 py-6 mb-3 flex rounded focus:bg-indigo-50 dark:focus:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 active:bg-indigo-100 dark:active:bg-gray-600 focus:outline-none transition duration-500 ease-out bg-white dark:bg-gray-800"
      @click="toggleExpand"
    >
      <div class="mr-4">
        <div class="w-7 h-7 rounded-full bg-cover bg-center bg-purple-120 dark:bg-purple-800">
          <Icon
            :icon="data.icon"
            class="w-7 h-7 text-purple-500 dark:text-purple-300"
          />
        </div>
      </div>

      <div class="w-full flex flex-col">
        <div class="w-full">
          <div class="flex items-start">
            <div class="grow mb-4 text-start">
              <p class="heading-2 text-gray-900 dark:text-gray-100">
                {{ data.title }}
              </p>
            </div>
            <p class="body-1 text-gray-600 dark:text-gray-400">
              {{ data.lastUpdated }}
            </p>
          </div>
        </div>

        <div class="flex justify-between">
          <div>
            <p class="body-2 text-gray-700 dark:text-gray-300 text-left">
              {{ data.description }}
            </p>
          </div>
        </div>
      </div>
    </button>

    <transition name="expand">
      <div v-if="isExpanded" class="px-5 py-4 mb-3 bg-gray-100 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200 overflow-hidden">
        <div v-for="(value, key) in data" :key="key" class="mb-2">
          <strong>{{ key }}:</strong> {{ value }}
        </div>
        <div class="mt-4 flex space-x-2">
          <Button
            class="contained-primary contained-text flex-grow py-4"
            @click="isEditMode = true"
          >
            Edit
          </Button>
          <Button
            v-show="isEditMode"
            class="contained-primary contained-text flex-grow py-4"
            @click="saveChanges"
          >
            save
          </Button>
          <Button
            v-show="isEditMode"
            class="contained-primary contained-text flex-grow py-4"
            @click="isEditMode = false"
          >
            Cancel
          </Button>
          <Button
            class="contained-secondary contained-text flex-grow py-4"
            @click="remove"
          >
            Remove
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  max-height: 1000px;
  opacity: 1;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>