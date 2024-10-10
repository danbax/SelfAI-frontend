// src/components/ui/inputs/SearchInput.vue

<script setup lang="ts">
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import LabeledTextInput from "@src/components/ui/inputs/LabeledTextInput.vue";

const props = defineProps<{
  modelValue: string;
  variant?: string;
  class?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const updateValue = (newValue: string) => {
  emit('update:modelValue', newValue);
};
</script>

<template>
  <LabeledTextInput
    placeholder="Search.."
    class="pl-7"
    :modelValue="modelValue"
    @update:modelValue="updateValue"
  >
    <template v-slot:startAdornment>
      <MagnifyingGlassIcon
        class="w-5 h-5 mx-[8px] translate-y-[75%] text-gray-400 dark:text-white dark:opacity-70"
      />
    </template>
    <template v-slot:endAdornment>
      <IconButton
        v-if="modelValue"
        @click="updateValue('')"
        title="clear text"
        aria-label="clear text"
        class="ic-btn-ghost-gray m-[.5rem] p-2"
      >
        <XCircleIcon class="w-5 h-5" />
      </IconButton>
    </template>
  </LabeledTextInput>
</template>