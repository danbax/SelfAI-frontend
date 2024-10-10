<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

const emit = defineEmits(["value-changed"]);

const props = defineProps<{
  id?: string;
  type?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  bordered?: boolean;
  autoResize?: boolean;
}>();

const textarea: Ref<HTMLTextAreaElement | null> = ref(null);

// change the size of the textarea
const autoResize = () => {
  if (props.autoResize && textarea.value) {
    textarea.value.style.height = "auto";
    textarea.value.style.height = textarea.value.scrollHeight + "px";
  }
};

// (event) change the input value and the size of the textarea
const handleInput = (event: Event) => {
  const newValue = (event.target as HTMLTextAreaElement).value;
  emit("value-changed", newValue);
  autoResize();
};
</script>

<template>
  <textarea
    :name="name"
    :id="id"
    class="text-input"
    :class="[bordered ? 'bordered-input' : 'ringed-input']"
    @input="handleInput"
    :value="value"
    :placeholder="placeholder"
    ref="textarea"
  ></textarea>
</template>