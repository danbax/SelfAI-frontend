<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue?: string; // Changed from 'value' to 'modelValue'
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  bordered?: boolean;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <input
    :type="props.type || 'text'"
    :name="props.name"
    :id="props.id"
    class="text-input"
    :class="[props.bordered ? 'bordered-input' : 'ringed-input']"
    @input="handleInput"
    :value="modelValue"
    :placeholder="props.placeholder"
  />
</template>